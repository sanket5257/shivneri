'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Volume2, VolumeX } from 'lucide-react';

const BookingModal = dynamic(() => import('../BookingModal'), { ssr: false });

/* -------------------------------------------------------------------------- */
/*  CONFIG — change brand / contact / links here                              */
/* -------------------------------------------------------------------------- */

const BRAND = 'SHIVNERI';              // the giant guitar-string name
const SMALL_TITLE = "Let's build work that inspires.";
const BIG_HEADING = ['Ready to build', 'something bold?'];
const COPYRIGHT_YEAR = 2026;

const ENQUIRY = {
  email: 'support@shivnerisystems.com',
  phone: '+91 8805641257',
};

const SOCIALS = [
  { label: 'Linkedin', href: 'https://linkedin.com/company/shivneri-systems/' },
  { label: 'Facebook', href: 'https://facebook.com/shivneriofficial' },
  { label: 'Instagram', href: 'https://instagram.com/shivneri_systems/' },
  { label: 'Twitter', href: 'https://twitter.com/Shivneri_sys' },
  { label: 'Pinterest', href: 'https://in.pinterest.com/shivnerisystems/' },
];

const LIGHT = '#d8d8d8';

/* -------------------------------------------------------------------------- */
/*  NavLink — character-swap hover (original slides up, clone rises in)        */
/* -------------------------------------------------------------------------- */

function NavLink({ label }: { label: string }) {
  const chars = label.split('');
  const render = (layer: 'orig' | 'clone') => (
    <span className={`tf2-layer tf2-${layer}`}>
      {chars.map((c, i) => (
        <span
          key={i}
          className="tf2-char"
          style={{ ['--i' as string]: i }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
  return (
    <span className="tf2-navlink">
      {render('orig')}
      {render('clone')}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  CollabButton — letter stagger + underline wipe + arrow nudge               */
/* -------------------------------------------------------------------------- */

function CollabButton({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const chars = label.split('');
  return (
    <a
      href={href ?? '#'}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      className="tf2-btn"
      draggable={false}
    >
      <span className="tf2-btn-underline">
        <span className="tf2-u tf2-u-right" />
        <span className="tf2-u tf2-u-left" />
      </span>
      <span className="tf2-btn-word">
        {chars.map((c, i) => (
          <span
            key={i}
            className="tf2-btn-char"
            style={{ ['--d' as string]: `${i * 28}ms` }}
          >
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </span>
      <span className="tf2-arrow" aria-hidden="true">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
          <path
            d="M5.47372 8.652V6.552L8.32972 3.752V4.9L5.47372 2.1V-3.09944e-06L9.32372 3.836V4.816L5.47372 8.652ZM-0.000281237 5.11V3.542H8.60972V5.11H-0.000281237Z"
            fill={LIGHT}
          />
        </svg>
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  RevealTitle — blur(12px)/opacity reveal when scrolled into view            */
/* -------------------------------------------------------------------------- */

function RevealTitle({
  children,
  className = '',
  as = 'span',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h2';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style: React.CSSProperties = {
    filter: shown ? 'blur(0px)' : 'blur(12px)',
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : 'translateY(8px)',
    transition: 'filter .9s ease, opacity .9s ease, transform .9s ease',
    willChange: 'filter, opacity, transform',
  };
  const Tag = as as 'span';
  return (
    <Tag ref={ref as React.Ref<HTMLSpanElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/*  StringText — the giant brand name rendered as pluckable guitar strings     */
/*  The word is sampled into horizontal scan-lines; each line is a chain of    */
/*  points driven by 1-D wave physics. The pointer plucks the nearest points   */
/*  and the displacement ripples + reflects off the fixed ends = vibration.    */
/* -------------------------------------------------------------------------- */

type SPoint = { x: number; baseY: number; disp: number; vel: number };
type SString = {
  pts: SPoint[];
  minX: number;
  maxX: number;
  baseY: number;
  quiet: boolean; // re-armed and ready to make a sound
  lastT: number;  // last time this string was plucked (ms)
};

function StringText({
  text,
  soundOnRef,
}: {
  text: string;
  soundOnRef: React.RefObject<boolean>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let strings: SString[] = [];
    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;

    // pointer state (canvas/css px coordinates)
    const ptr = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };

    const ROW_GAP = 7;     // vertical spacing between strings (css px)
    const POINT_GAP = 6;   // horizontal spacing of points along a string
    const MIN_RUN = 5;     // ignore filled runs thinner than this
    const GRAB = 40;       // pointer influence radius — very tight, nearest lines only
    const MAXBEND = 22;    // max deflection (px)
    const FOLLOW = 0.26;   // how quickly the string eases toward the cursor
    const COUPLE = 0.18;   // neighbour coupling (wave travels along the line)
    const ANCHOR = 0.005;  // restoring to flat
    const DAMP = 0.87;     // energy loss — settles cleanly, no extra wobble

    /* ----- plucked-string audio ------------------------------------- */
    type AC = AudioContext;
    let audio: AC | null = null;
    let master: GainNode | null = null;
    let lastSound = 0;        // last global pluck time (ms)
    let soundsThisFrame = 0;

    // a real guitar in standard tuning: 6 open strings (low E -> high E)
    const OPEN = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];
    // frets quantised to a major scale so any drag stays musical (2 octaves)
    const FRETS = [
      0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24,
    ];

    // which guitar string (vertical band) + which fret (horizontal pluck pos)
    function noteForPluck(str: SString, px: number): number {
      const t = H > 0 ? 1 - str.baseY / H : 0.5; // higher up = higher string
      const sIdx = Math.max(0, Math.min(OPEN.length - 1, Math.floor(t * OPEN.length)));
      const fx = W > 0 ? Math.max(0, Math.min(1, px / W)) : 0.5;
      const fIdx = Math.max(0, Math.min(FRETS.length - 1, Math.floor(fx * FRETS.length)));
      const semis = FRETS[fIdx];
      // tiny human detune (±6 cents) so repeats never sound identical
      const detune = (((str.baseY * 13 + px * 7) % 12) / 12 - 0.5) * 0.12;
      return OPEN[sIdx] * Math.pow(2, (semis + detune) / 12);
    }

    function ensureAudio(): AC | null {
      if (typeof window === 'undefined') return null;
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      if (!audio) {
        audio = new Ctor();
        master = audio.createGain();
        master.gain.value = 0.5;
        master.connect(audio.destination);
      }
      if (audio.state === 'suspended') audio.resume();
      return audio;
    }

    function playPluck(freq: number, amp: number) {
      const ac = ensureAudio();
      if (!ac || !master) return;
      // Don't schedule into a still-locked context — the notes would land in
      // the past and play silently. Nudge a resume and skip this pluck; once a
      // gesture unlocks it, subsequent hovers sound normally.
      if (ac.state !== 'running') {
        ac.resume().catch(() => {});
        return;
      }
      const t = ac.currentTime;
      const a = Math.min(0.42, amp);
      const nodes: AudioNode[] = [];

      // shared lowpass that opens on the pluck then closes — gives the
      // soft, woody "plucked acoustic string" timbre
      const lp = ac.createBiquadFilter();
      lp.type = 'lowpass';
      lp.Q.value = 1;
      lp.frequency.setValueAtTime(Math.min(7000, freq * 7), t);
      lp.frequency.exponentialRampToValueAtTime(Math.max(180, freq * 1.6), t + 0.45);

      const body = ac.createGain();
      body.gain.setValueAtTime(0.0001, t);
      body.gain.exponentialRampToValueAtTime(a, t + 0.006); // quick attack
      body.gain.exponentialRampToValueAtTime(a * 0.28, t + 0.22);
      body.gain.exponentialRampToValueAtTime(0.0001, t + 1.6); // long tail
      lp.connect(body);
      body.connect(master);
      nodes.push(lp, body);

      // fundamental (mellow) + soft octave shimmer = warm string colour
      const o1 = ac.createOscillator();
      o1.type = 'triangle';
      o1.frequency.value = freq;
      const o2 = ac.createOscillator();
      o2.type = 'sine';
      o2.frequency.value = freq * 2;
      const o2g = ac.createGain();
      o2g.gain.value = 0.3;
      o1.connect(lp);
      o2.connect(o2g);
      o2g.connect(lp);
      nodes.push(o1, o2, o2g);

      // short filtered-noise "tick" for the pluck transient
      const tickLen = Math.max(1, Math.floor(ac.sampleRate * 0.012));
      const buf = ac.createBuffer(1, tickLen, ac.sampleRate);
      const ch = buf.getChannelData(0);
      for (let i = 0; i < tickLen; i++) {
        ch[i] = (Math.random() * 2 - 1) * (1 - i / tickLen);
      }
      const tick = ac.createBufferSource();
      tick.buffer = buf;
      const bp = ac.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = Math.min(5000, freq * 4);
      bp.Q.value = 0.8;
      const tickG = ac.createGain();
      tickG.gain.value = a * 0.5;
      tick.connect(bp);
      bp.connect(tickG);
      tickG.connect(master);
      nodes.push(tick, bp, tickG);

      o1.start(t);
      o2.start(t);
      tick.start(t);
      o1.stop(t + 1.7);
      o2.stop(t + 1.7);
      tick.stop(t + 0.02);
      o1.onended = () => {
        for (const nNode of nodes) {
          try {
            nNode.disconnect();
          } catch {
            /* already gone */
          }
        }
      };
    }

    function sample() {
      const rect = wrap!.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      dpr = Math.min(2, window.devicePixelRatio || 1);

      // size font so the word fills ~99% of the width
      const off = document.createElement('canvas');
      const octx = off.getContext('2d')!;
      const fontOf = (px: number) =>
        `700 ${px}px 'Instrument Sans', system-ui, sans-serif`;
      octx.font = fontOf(100);
      const wAt100 = octx.measureText(text).width || 1;
      const letterSpace = 100 * 0.0; // none
      let fontPx = ((W * 0.99) / (wAt100 + letterSpace)) * 100;
      fontPx = Math.min(fontPx, 520);

      H = Math.ceil(fontPx * 0.86);
      off.width = W;
      off.height = H;
      octx.clearRect(0, 0, W, H);
      octx.font = fontOf(fontPx);
      octx.textAlign = 'center';
      octx.textBaseline = 'alphabetic';
      octx.fillStyle = '#fff';
      octx.fillText(text, W / 2, H * 0.82);

      const data = octx.getImageData(0, 0, W, H).data;
      const filled = (x: number, y: number) =>
        data[(y * W + x) * 4 + 3] > 128;

      strings = [];
      for (let y = Math.floor(ROW_GAP / 2); y < H; y += ROW_GAP) {
        let runStart = -1;
        for (let x = 0; x <= W; x++) {
          const on = x < W && filled(x, y);
          if (on && runStart === -1) runStart = x;
          if ((!on || x === W) && runStart !== -1) {
            const runEnd = x - 1;
            if (runEnd - runStart >= MIN_RUN) {
              const pts: SPoint[] = [];
              for (let px = runStart; px <= runEnd; px += POINT_GAP) {
                pts.push({ x: px, baseY: y, disp: 0, vel: 0 });
              }
              // guarantee the closing point sits exactly on the run end
              if (pts[pts.length - 1].x !== runEnd) {
                pts.push({ x: runEnd, baseY: y, disp: 0, vel: 0 });
              }
              if (pts.length >= 2) {
                strings.push({
                  pts,
                  minX: runStart,
                  maxX: runEnd,
                  baseY: y,
                  quiet: true,
                  lastT: 0,
                });
              }
            }
            runStart = -1;
          }
        }
      }

      // size the visible canvas
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
    }

    function step() {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      const moveX = ptr.x - ptr.px;
      const moveY = ptr.y - ptr.py;
      const speed = Math.hypot(moveX, moveY);

      const tNow = performance.now();
      soundsThisFrame = 0;
      const canSound = soundOnRef.current !== false;

      for (let s = 0; s < strings.length; s++) {
        const str = strings[s];
        const pts = str.pts;
        const n = pts.length;

        // pointer pluck — only test strings whose band is near the pointer
        const near =
          ptr.active &&
          ptr.y > str.baseY - GRAB &&
          ptr.y < str.baseY + GRAB &&
          ptr.x > str.minX - GRAB &&
          ptr.x < str.maxX + GRAB;

        // 1-D wave update with fixed ends — this is the vibration that
        // remains after the cursor lets go of the string
        for (let i = 1; i < n - 1; i++) {
          const p = pts[i];
          const f =
            (pts[i - 1].disp - p.disp) * COUPLE +
            (pts[i + 1].disp - p.disp) * COUPLE -
            p.disp * ANCHOR;
          p.vel = (p.vel + f) * DAMP;
        }
        for (let i = 1; i < n - 1; i++) pts[i].disp += pts[i].vel;

        // pointer drags the nearby part of the string into a smooth,
        // bounded bend — eased, not impulsive, so it never looks jittery
        if (near) {
          for (let i = 1; i < n - 1; i++) {
            const p = pts[i];
            const dx = ptr.x - p.x;
            const dy = ptr.y - p.baseY;
            const dist = Math.hypot(dx, dy);
            if (dist < GRAB) {
              const w = 1 - dist / GRAB; // closeness falloff
              let target = dy * w;
              if (target > MAXBEND) target = MAXBEND;
              else if (target < -MAXBEND) target = -MAXBEND;
              const next = p.disp + (target - p.disp) * FOLLOW * w;
              p.vel += (next - p.disp) * 0.5; // store momentum for the release
              p.vel *= 0.5; // tame energy while held
              p.disp = next;
            }
          }

          // make a sound when a freshly-touched string is re-armed
          if (
            canSound &&
            str.quiet &&
            soundsThisFrame < 3 &&
            tNow - lastSound > 28 &&
            tNow - str.lastT > 160
          ) {
            const amp = Math.min(0.4, 0.12 + speed * 0.01);
            playPluck(noteForPluck(str, ptr.x), amp);
            str.quiet = false;
            str.lastT = tNow;
            lastSound = tNow;
            soundsThisFrame++;
          }
        }
        pts[0].disp = 0;
        pts[n - 1].disp = 0;

        // draw
        let energy = 0;
        ctx!.beginPath();
        ctx!.moveTo(pts[0].x, pts[0].baseY + pts[0].disp);
        for (let i = 1; i < n; i++) {
          const p = pts[i];
          energy += Math.abs(p.disp);
          ctx!.lineTo(p.x, p.baseY + p.disp);
        }
        const e = Math.min(1, energy / (n * 6));

        // re-arm the string for another pluck once it has settled
        if (!str.quiet && e < 0.05 && !near) str.quiet = true;

        // base line stays dim; plucked lines glow orange (brand accent)
        const alpha = 0.55 + e * 0.45;
        if (e > 0.04) {
          // 216,216,216 (grey)  ->  255,110,40 (#ff6e28 orange)
          const g = Math.round(216 - 106 * e);
          const b = Math.round(216 - 176 * e);
          ctx!.strokeStyle = `rgba(255,${g},${b},${alpha})`;
        } else {
          ctx!.strokeStyle = `rgba(216,216,216,${alpha})`;
        }
        ctx!.lineWidth = 1 + e * 0.8;
        ctx!.lineCap = 'round';
        ctx!.stroke();
      }

      ptr.px = ptr.x;
      ptr.py = ptr.y;
      raf = requestAnimationFrame(step);
    }

    const toLocal = (cx: number, cy: number) => {
      const r = canvas!.getBoundingClientRect();
      ptr.x = cx - r.left;
      ptr.y = cy - r.top;
    };
    const onMove = (e: PointerEvent) => {
      ptr.active = true;
      ensureAudio(); // unlock on the very first hover, not just on click
      toLocal(e.clientX, e.clientY);
    };
    const onLeave = () => {
      ptr.active = false;
      ptr.x = -9999;
      ptr.y = -9999;
    };
    // Browsers refuse to start an AudioContext until a real user gesture —
    // hovering and scrolling don't count, only pointer/touch/key/click do.
    // Resume on the first such gesture anywhere on the page and keep listening
    // until the context is actually `running`, then stop. This is what makes
    // the first hover reliably produce sound without needing a click/refresh.
    const unlockEvents = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'keydown',
      'click',
    ] as const;
    const unlock = () => {
      const ac = ensureAudio();
      if (!ac) return;
      const settle = () => {
        if (ac.state === 'running') {
          unlockEvents.forEach((ev) => window.removeEventListener(ev, unlock));
        }
      };
      if (ac.state !== 'running') ac.resume().then(settle).catch(() => {});
      else settle();
    };

    sample();
    ptr.px = ptr.x;
    ptr.py = ptr.y;
    raf = requestAnimationFrame(step);

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    unlockEvents.forEach((ev) =>
      window.addEventListener(ev, unlock, { passive: true })
    );

    let rt: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(sample, 150);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      unlockEvents.forEach((ev) => window.removeEventListener(ev, unlock));
      ro.disconnect();
      clearTimeout(rt);
      if (audio) {
        audio.close().catch(() => {});
        audio = null;
      }
    };
  }, [text, soundOnRef]);

  return (
    <div
      ref={wrapRef}
      className="w-full select-none"
      style={{ mixBlendMode: 'difference' }}
    >
      <canvas ref={canvasRef} className="block w-full cursor-pointer" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer2                                                                    */
/* -------------------------------------------------------------------------- */

export default function Footer2() {
  const [clock, setClock] = useState('--:--');
  const [soundOn, setSoundOn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const soundOnRef = useRef(true);
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
      setClock(t);
    };
    tick();
    const id = setInterval(tick, 1000 * 20);
    return () => clearInterval(id);
  }, []);

  const css = useMemo(() => FOOTER_CSS, []);

  return (
    <>
    <footer
      className="relative z-10 flex min-h-screen flex-col overflow-hidden"
      style={{ background: '#040508', color: LIGHT }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="relative z-20 flex w-full flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[1728px] flex-1 flex-col px-6 pt-24 pb-6 md:px-12 md:pt-36 md:pb-16 lg:px-16">
          {/* ---- TOP ROW ---- */}
          <div className="grid w-full grid-cols-12 gap-y-10 md:gap-x-12 lg:mb-20">
            <div className="col-span-12 flex min-w-0 flex-col justify-between gap-6 md:col-span-6 lg:col-span-7 xl:col-span-8">
              <div>
                <RevealTitle className="tf2-title mb-4 block">
                  {SMALL_TITLE}
                </RevealTitle>
                <h2 className="tf2-big max-w-[50rem]">
                  {BIG_HEADING[0]}
                  <br />
                  {BIG_HEADING[1]}
                </h2>
              </div>
            </div>

            <div className="col-span-12 flex w-full min-w-0 flex-col justify-between md:col-span-6 lg:col-span-5 xl:col-span-4">
              <div className="mb-8 hidden w-full md:flex md:items-start md:justify-end">
                <span className="tf2-title" style={{ color: 'rgba(216,216,216,.5)' }}>
                  IST → {clock}
                </span>
              </div>
              <CollabButton
                label="START A COLLABORATION"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          {/* ---- MIDDLE ROW ---- */}
          <div className="my-auto grid w-full grid-cols-12 gap-y-10 py-16 md:gap-x-10 lg:gap-x-12 lg:py-0">
            <div className="order-2 col-span-12 flex min-w-0 flex-col justify-between gap-6 md:order-1 md:col-span-6 lg:col-span-7 xl:col-span-8">
              <span className="tf2-title block" style={{ color: 'rgba(216,216,216,.5)' }}>
                © {COPYRIGHT_YEAR} Shivneri Systems Pvt. Ltd. All rights reserved.
              </span>
              <RevealTitle className="tf2-title hidden md:block">
                <button
                  type="button"
                  onClick={() => setSoundOn((v) => !v)}
                  className="tf2-title inline-flex cursor-pointer items-center"
                  aria-pressed={soundOn}
                  aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
                >
                  <span style={{ color: 'rgba(216,216,216,.5)' }}>
                    sound {soundOn ? 'on' : 'off'}
                  </span>
                  {soundOn ? (
                    <Volume2 size={16} className="mx-1.5" strokeWidth={1.5} />
                  ) : (
                    <VolumeX size={16} className="mx-1.5" strokeWidth={1.5} />
                  )}
                  <span>Hover the lines.</span>
                </button>
              </RevealTitle>
            </div>

            <div className="order-1 col-span-12 flex w-full min-w-0 flex-col justify-between md:order-2 md:col-span-6 lg:col-span-5 xl:col-span-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
                {/* Business enquiry */}
                <div className="flex min-w-0 flex-col">
                  <span className="tf2-title mb-6 block" style={{ color: 'rgba(216,216,216,.5)' }}>
                    Business enquiry
                  </span>
                  <p className="mb-2 flex gap-2">
                    <a href={`mailto:${ENQUIRY.email}`} className="block" style={{ color: LIGHT }}>
                      <NavLink label={ENQUIRY.email} />
                    </a>
                  </p>
                  <p className="flex gap-2">
                    <a href={`tel:${ENQUIRY.phone.replace(/\s/g, '')}`} className="block" style={{ color: LIGHT }}>
                      <NavLink label={ENQUIRY.phone} />
                    </a>
                  </p>
                </div>

                {/* Social */}
                <div className="flex min-w-0 flex-col">
                  <span className="tf2-title mb-6 block" style={{ color: 'rgba(216,216,216,.5)' }}>
                    Social
                  </span>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-2">
                    {SOCIALS.map((s) => (
                      <p key={s.label} className="w-full max-w-[calc(50%-1rem)]">
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="block" style={{ color: LIGHT }}>
                          <NavLink label={s.label} />
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- BIG GUITAR-STRING NAME ---- */}
          <div className="mt-10 flex w-full min-w-0 flex-col justify-end">
            <StringText text={BRAND} soundOnRef={soundOnRef} />
          </div>
        </div>
      </div>
    </footer>

    <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scoped CSS for the hover animations                                        */
/* -------------------------------------------------------------------------- */

const FOOTER_CSS = `
.tf2-title{
  font-size: 13.5px;
  letter-spacing: -0.27px;
  text-transform: uppercase;
  line-height: 1.2;
  font-weight: 400;
}
.tf2-big{
  font-weight: 600;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: ${LIGHT};
}

/* ---- NavLink char swap ---- */
.tf2-navlink{
  position: relative;
  display: inline-flex;
  overflow: hidden;
  line-height: 1;
  cursor: pointer;
  vertical-align: bottom;
}
.tf2-layer{ display: inline-flex; }
.tf2-clone{ position: absolute; left: 0; top: 0; }
.tf2-char{
  display: inline-block;
  transition: transform .55s cubic-bezier(.62,.05,.01,.99);
  transition-delay: calc(var(--i) * 18ms);
  will-change: transform;
}
.tf2-orig .tf2-char{ transform: translateY(0); }
.tf2-clone .tf2-char{ transform: translateY(105%); }
.tf2-navlink:hover .tf2-orig .tf2-char{ transform: translateY(-105%); }
.tf2-navlink:hover .tf2-clone .tf2-char{ transform: translateY(0); }

/* ---- Collab button ---- */
.tf2-btn{
  position: relative;
  display: inline-flex;
  align-self: flex-start;
  width: fit-content;
  align-items: center;
  min-height: 2.5rem;
  padding-right: 2.2rem;
  overflow: hidden;
  text-transform: uppercase;
  font-size: 13.5px;
  letter-spacing: -0.27px;
  color: ${LIGHT};
  text-decoration: none;
  cursor: pointer;
  transition: opacity .3s ease;
}
.tf2-btn:hover{ opacity: .95; }
.tf2-btn-word{ position: relative; display: inline-flex; }
.tf2-btn-char{
  display: inline-block;
  transition: transform .5s cubic-bezier(.62,.05,.01,.99);
  transition-delay: var(--d);
  will-change: transform;
}
.tf2-btn:hover .tf2-btn-char{ transform: translateX(10px); }

.tf2-btn-underline{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  pointer-events: none;
}
.tf2-u{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: ${LIGHT};
  will-change: transform;
}
.tf2-u-right{ transform-origin: right center; transform: scaleX(1); transition: transform .5s cubic-bezier(.62,.05,.01,.99); }
.tf2-u-left{  transform-origin: left center;  transform: scaleX(0); transition: transform .5s cubic-bezier(.62,.05,.01,.99) .12s; }
.tf2-btn:hover .tf2-u-right{ transform: scaleX(0); }
.tf2-btn:hover .tf2-u-left{  transform: scaleX(1); }

.tf2-arrow{
  position: absolute;
  right: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform .45s cubic-bezier(.62,.05,.01,.99);
}
.tf2-btn:hover .tf2-arrow{ transform: translate(6px, -50%); }
`;
