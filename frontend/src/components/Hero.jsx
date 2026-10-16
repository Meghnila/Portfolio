import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useMotionTemplate,
    useReducedMotion,
} from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Terminal typing hook                                              */
/* ------------------------------------------------------------------ */
const useTyped = (lines, active, speed = 28) => {
    const [output, setOutput] = useState([]);
    const timer = useRef(null);

    useEffect(() => {
        if (!active) {
            setOutput([]);
            return;
        }
        let line = 0;
        let char = 0;

        const step = () => {
            if (line >= lines.length) return;
            const current = lines[line];
            char += 1;

            setOutput((prev) => {
                const next = prev.slice(0, line);
                next[line] = current.slice(0, char);
                return next;
            });

            if (char >= current.length) {
                line += 1;
                char = 0;
                timer.current = setTimeout(step, 380);
            } else {
                timer.current = setTimeout(step, speed);
            }
        };

        timer.current = setTimeout(step, 650);
        return () => clearTimeout(timer.current);
    }, [active, lines, speed]);

    return output;
};

/* ------------------------------------------------------------------ */
/*  Aurora background                                                 */
/* ------------------------------------------------------------------ */
const Aurora = ({ palette, isDark, animate }) => {
    // Reduced opacity for light mode to keep the background clean
    const blobs = [
        { c: palette.primary, top: '-30%', left: '-15%', size: '75vw', dur: 26, delay: 0, op: isDark ? 0.30 : 0.10 },
        { c: palette.secondary, top: '25%', left: '50%', size: '65vw', dur: 34, delay: 5, op: isDark ? 0.22 : 0.08 },
        { c: palette.primary, top: '55%', left: '-5%', size: '55vw', dur: 30, delay: 9, op: isDark ? 0.14 : 0.05 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {blobs.map((b, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        top: b.top,
                        left: b.left,
                        width: b.size,
                        height: b.size,
                        opacity: b.op,
                        background: `radial-gradient(circle, ${b.c} 0%, transparent 62%)`,
                        filter: 'blur(110px)',
                        willChange: 'transform',
                    }}
                    animate={
                        animate
                            ? {
                                  x: [0, 70, -50, 0],
                                  y: [0, -50, 40, 0],
                                  scale: [1, 1.15, 0.92, 1],
                              }
                            : undefined
                    }
                    transition={{
                        duration: b.dur,
                        delay: b.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            <motion.div
                className="absolute top-1/2 left-1/2 w-[140vmax] h-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${palette.primary} 18%, transparent 40%, ${palette.secondary} 62%, transparent 85%)`,
                }}
                animate={animate ? { rotate: 360 } : undefined}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Bottom tech marquee — AWS Engineer Focused                        */
/* ------------------------------------------------------------------ */
const Marquee = ({ items, palette, isDark }) => (
    <div
        className="relative w-full overflow-hidden"
        style={{
            maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        }}
    >
        <motion.div
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
            {[...items, ...items].map((item, i) => (
                <span
                    key={i}
                    className="flex items-center gap-6 pr-6 text-[10px] md:text-[11px] font-bold tracking-[0.28em] uppercase whitespace-nowrap"
                    style={{ color: isDark ? 'var(--text-muted)' : '#64748b' }}
                >
                    {item}
                    <span
                        className="inline-block w-1 h-1 rounded-full"
                        style={{ backgroundColor: i % 2 === 0 ? palette.primary : palette.secondary }}
                    />
                </span>
            ))}
        </motion.div>
    </div>
);

/* ------------------------------------------------------------------ */
/*  Terminal card — AWS Engineer Focused                              */
/* ------------------------------------------------------------------ */
const TERMINAL_LINES = [
    '$ whoami',
    'meghnila.das — aws cloud engineer',
    '$ aws sts get-caller-identity',
    'arn:aws:iam::12345678902:user/meghnila',
    '$ terraform plan',
    'Plan: 12 to add, 0 to change, 0 to destroy.',
    '$ deploy --prod',
    '✓ Infrastructure deployed · 45s',
];

const TerminalCard = ({ palette, active, isDark }) => {
    const typed = useTyped(TERMINAL_LINES, active);
    const done = typed.length === TERMINAL_LINES.length;

    // In light mode, we keep the terminal dark for a classic, high-contrast look
    const terminalBg = isDark 
        ? 'color-mix(in srgb, var(--bg-main) 72%, transparent)' 
        : '#0f172a'; // slate-900
    
    const terminalBorder = isDark 
        ? '1px solid var(--border-subtle)' 
        : '1px solid rgba(255, 255, 255, 0.1)';

    return (
        <div
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
                background: terminalBg,
                border: terminalBorder,
                boxShadow: isDark 
                    ? `0 24px 60px -30px ${palette.primary}55` 
                    : `0 20px 40px -20px ${palette.primary}44`,
            }}
        >
            <div
                className="flex items-center gap-3 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
                <span className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                </span>
                <span
                    className="font-mono text-[10px] md:text-[11px] tracking-wide truncate"
                    style={{ color: '#94a3b8' }}
                >
                    meghnila@cloud — ~/infra — zsh
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: palette.secondary }}
                        />
                        <span
                            className="relative inline-flex rounded-full h-1.5 w-1.5"
                            style={{ backgroundColor: palette.secondary }}
                        />
                    </span>
                    <span className="font-mono text-[9px] tracking-widest" style={{ color: '#94a3b8' }}>
                        ONLINE
                    </span>
                </span>
            </div>

            <div className="p-5 md:p-6 font-mono text-[11px] md:text-xs leading-[1.9] min-h-[168px] md:min-h-[180px]">
                {typed.map((line, i) => {
                    const isPrompt = line?.startsWith('$');
                    const isSuccess = line?.startsWith('✓');
                    return (
                        <div key={i} className="whitespace-pre-wrap break-words">
                            {isPrompt ? (
                                <>
                                    <span style={{ color: palette.primary }}>$</span>
                                    <span style={{ color: '#f8fafc' }}>{line.slice(1)}</span>
                                </>
                            ) : (
                                <span
                                    style={{
                                        color: isSuccess ? palette.secondary : '#cbd5e1',
                                    }}
                                >
                                    {line}
                                </span>
                            )}
                        </div>
                    );
                })}
                {!done && (
                    <motion.span
                        className="inline-block w-[7px] h-[13px] align-middle"
                        style={{ backgroundColor: palette.primary }}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                )}
            </div>

            <div
                className="h-[2px] w-full"
                style={{
                    background: `linear-gradient(90deg, transparent, ${palette.primary}, ${palette.secondary}, transparent)`,
                    opacity: 0.6,
                }}
            />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
const TECH_ITEMS = [
    'AWS Lambda',
    'Amazon EC2',
    'Amazon S3',
    'DynamoDB',
    'CloudFormation',
    'Terraform',
    'Kubernetes',
    'Docker',
    'CI/CD Pipelines',
    'CloudFront',
    'RDS',
    'IAM',
    'VPC',
    'Route 53',
];

const Hero = () => {
    const containerRef = useRef(null);
    const reduce = useReducedMotion();

    const [isDark, setIsDark] = useState(
        () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    );
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== 'undefined' && window.innerWidth > 980
    );
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 981px)');
        const onMedia = (e) => setIsDesktop(e.matches);
        setIsDesktop(media.matches);
        media.addEventListener('change', onMedia);

        const observer = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains('dark'))
        );
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const t = setTimeout(() => setMounted(true), 120);

        return () => {
            media.removeEventListener('change', onMedia);
            observer.disconnect();
            clearTimeout(t);
        };
    }, []);

    const palette = useMemo(
        () =>
            isDark
                ? { primary: '#f97316', secondary: '#06b6d4', emissive: '#ea580c' }
                : { primary: '#3b82f6', secondary: '#8b5cf6', emissive: '#2563eb' },
        [isDark]
    );

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const springCfg = { damping: 28, stiffness: 110, restDelta: 0.001 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), springCfg);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.85], [1, 0]), springCfg);

    const mx = useMotionValue(50);
    const my = useMotionValue(50);
    const spotlight = useMotionTemplate`radial-gradient(560px circle at ${mx}% ${my}%, ${palette.primary}1f, transparent 68%)`;

    const tiltSrcX = useMotionValue(0);
    const tiltSrcY = useMotionValue(0);
    const rotateX = useSpring(useTransform(tiltSrcY, [-0.5, 0.5], [5, -5]), {
        damping: 30,
        stiffness: 130,
    });
    const rotateY = useSpring(useTransform(tiltSrcX, [-0.5, 0.5], [-6, 6]), {
        damping: 30,
        stiffness: 130,
    });

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const nx = (clientX - left) / width;
        const ny = (clientY - top) / height;

        mx.set(nx * 100);
        my.set(ny * 100);
        tiltSrcX.set(nx - 0.5);
        tiltSrcY.set(ny - 0.5);
    };

    const ease = [0.22, 1, 0.36, 1];
    const containerV = {
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.1 } },
    };
    const itemV = {
        hidden: { opacity: 0, y: reduce ? 0 : 26 },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.75, ease } },
    };

    // Dynamic text colors for light/dark mode
    const headingColor = isDark ? '#ffffff' : '#0f172a';
    const bodyColor = isDark ? '#ffffff' : '#334155';
    const gridOpacity = isDark ? 0.6 : 0.15;
    const vignetteColor = isDark ? 'var(--bg-main)' : '#f8fafc';

    return (
        <section
            id="home"
            ref={containerRef}
            onMouseMove={isDesktop && !reduce ? handleMouseMove : undefined}
            className="relative min-h-screen flex flex-col overflow-hidden"
            style={{ background: 'var(--bg-main)' }}
        >
            <Aurora palette={palette} isDark={isDark} animate={!reduce} />

            {isDesktop && !reduce && (
                <motion.div
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{ background: spotlight, opacity: isDark ? 1 : 0.5 }}
                />
            )}

            <div
                className="absolute inset-0 pointer-events-none z-[1] grid-overlay"
                style={{
                    opacity: gridOpacity,
                    maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, #000 20%, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, #000 20%, transparent 78%)',
                }}
            />

            <div
                className="absolute inset-x-0 top-0 h-40 pointer-events-none z-[1]"
                style={{ background: `linear-gradient(to bottom, ${vignetteColor}, transparent)` }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-[1]"
                style={{ background: `linear-gradient(to top, ${vignetteColor}, transparent)` }}
            />

            <div className="relative z-10 flex-1 flex items-center w-full">
                <motion.div
                    style={isDesktop ? { y, opacity } : undefined}
                    className="w-full max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-32"
                >
                    <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 xl:gap-20 items-center">
                        {/* ---------------- LEFT : copy ---------------- */}
                        <motion.div
                            variants={containerV}
                            initial="hidden"
                            animate="show"
                            className="lg:col-span-7 xl:col-span-7"
                        >
                            {/* availability pill */}
                            <motion.div variants={itemV} className="mb-7">
                                <div
                                    className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full backdrop-blur-md"
                                    style={{
                                        border: `1px solid ${palette.primary}33`,
                                        background: `${palette.primary}0d`,
                                    }}
                                >
                                    <span className="relative flex h-1.5 w-1.5 ml-1">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                                            style={{ backgroundColor: palette.primary }}
                                        />
                                        <span
                                            className="relative inline-flex rounded-full h-1.5 w-1.5"
                                            style={{ backgroundColor: palette.primary }}
                                        />
                                    </span>
                                    <span
                                        className="text-[9px] md:text-[10px] font-bold tracking-[0.24em] uppercase"
                                        style={{ color: isDark ? 'var(--text-main)' : '#1e293b' }}
                                    >
                                        Available for new Job
                                    </span>
                                </div>
                            </motion.div>

                            {/* name — massive, split across lines */}
                            <motion.h1
                                variants={itemV}
                                className="text-[4rem] sm:text-7xl md:text-8xl xl:text-[5rem] font-black leading-[0.85] tracking-tighter mb-1"
                                style={{ color: isDark ? 'var(--text-main)' : '#0f172a' }}
                            >
                                Meghnila
                            </motion.h1>
                            <motion.h1
                                variants={itemV}
                                className="text-[4rem] sm:text-7xl md:text-8xl xl:text-[5rem] font-black leading-[0.85] tracking-tighter mb-6 gradient-text"
                            >
                                Das
                            </motion.h1>

                            {/* role — DYNAMIC COLOR */}
                            <motion.h2
                                variants={itemV}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-8"
                                style={{ color: headingColor }}
                            >
                                AWS Cloud Engineer
                            </motion.h2>

                            {/* description — DYNAMIC COLOR */}
                            <motion.p
                                variants={itemV}
                                className="text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mb-10 font-medium"
                                style={{ color: bodyColor }}
                            >
                                I architect and automate resilient cloud infrastructure on AWS.
                                From serverless applications to scalable microservices, I focus on
                                security, cost-efficiency, and high availability.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                variants={itemV}
                                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
                            >
                                <a
                                    href="#projects"
                                    className="btn-primary group flex items-center justify-center gap-2 min-w-[190px]"
                                >
                                    View Projects
                                    <motion.span
                                        animate={reduce ? undefined : { x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                                    >
                                        →
                                    </motion.span>
                                </a>
                                <a
                                    href="#contact"
                                    className="btn-secondary glass flex items-center justify-center gap-2 min-w-[190px]"
                                    style={!isDark ? { borderColor: '#cbd5e1', color: '#0f172a' } : {}}
                                >
                                    Let&apos;s Talk
                                </a>
                            </motion.div>

                            {/* micro meta row */}
                            <motion.div
                                variants={itemV}
                                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase"
                                style={{ color: isDark ? 'var(--text-muted)' : '#64748b' }}
                            >
                                <span className="flex items-center gap-2">
                                    <span
                                        className="w-1 h-1 rounded-full"
                                        style={{ backgroundColor: palette.secondary }}
                                    />
                                    Remote friendly
                                </span>
                                <span className="flex items-center gap-2">
                                    <span
                                        className="w-1 h-1 rounded-full"
                                        style={{ backgroundColor: palette.primary }}
                                    />
                                    AWS certified
                                </span>
                                <span className="flex items-center gap-2">
                                    <span
                                        className="w-1 h-1 rounded-full"
                                        style={{ backgroundColor: palette.secondary }}
                                    />
                                    IST · UTC+5:30
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* ---------------- RIGHT : bento stack ---------------- */}
                        <motion.div
                            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduce ? 0 : 0.9, delay: 0.35, ease }}
                            className="lg:col-span-5 xl:col-span-5"
                            style={{ perspective: '1200px' }}
                        >
                            <motion.div
                                style={
                                    isDesktop && !reduce
                                        ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
                                        : undefined
                                }
                                className="flex flex-col gap-4"
                            >
                                <TerminalCard palette={palette} active={mounted} isDark={isDark} />

                                {/* stat tiles */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { value: '2.5+', label: 'Years in Cloud Architecture', accent: palette.primary },
                                        { value: '100+', label: 'AWS Resources Managed', accent: palette.secondary },
                                    ].map((s, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={reduce ? undefined : { y: -4 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                            className="relative rounded-2xl p-5 backdrop-blur-xl overflow-hidden"
                                            style={{
                                                background: isDark 
                                                    ? 'color-mix(in srgb, var(--bg-main) 72%, transparent)' 
                                                    : 'rgba(255, 255, 255, 0.8)',
                                                border: isDark 
                                                    ? '1px solid var(--border-subtle)' 
                                                    : '1px solid rgba(0, 0, 0, 0.05)',
                                                boxShadow: isDark 
                                                    ? 'none' 
                                                    : '0 10px 30px -10px rgba(0,0,0,0.05)',
                                            }}
                                        >
                                            <div
                                                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-2xl"
                                                style={{ background: s.accent }}
                                            />
                                            <div
                                                className="text-3xl md:text-4xl font-black leading-none mb-2"
                                                style={{ color: isDark ? 'var(--text-main)' : '#0f172a' }}
                                            >
                                                {s.value}
                                            </div>
                                            <div
                                                className="text-[10px] font-semibold tracking-[0.14em] uppercase leading-snug"
                                                style={{ color: isDark ? 'var(--text-muted)' : '#64748b' }}
                                            >
                                                {s.label}
                                            </div>
                                            <div
                                                className="absolute bottom-0 left-0 h-[2px] w-1/2"
                                                style={{
                                                    background: `linear-gradient(to right, ${s.accent}, transparent)`,
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* ============ BOTTOM MARQUEE ============ */}
            <div
                className="relative z-10 border-t py-5 md:py-6"
                style={{
                    borderColor: isDark ? 'var(--border-subtle)' : 'rgba(0,0,0,0.05)',
                    background: isDark 
                        ? 'color-mix(in srgb, var(--bg-main) 60%, transparent)' 
                        : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Marquee items={TECH_ITEMS} palette={palette} isDark={isDark} />
            </div>

            {/* ============ SCROLL CUE ============ */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 1.6, duration: 1 }}
                className="absolute left-6 md:left-10 bottom-28 md:bottom-32 hidden lg:flex flex-col items-center gap-3 z-10"
            >
                <span
                    className="text-[9px] font-bold tracking-[0.35em] uppercase"
                    style={{ 
                        color: isDark ? 'var(--text-muted)' : '#64748b', 
                        writingMode: 'vertical-rl' 
                    }}
                >
                    Scroll
                </span>
                <div
                    className="relative w-px h-20 overflow-hidden"
                    style={{ background: isDark ? 'var(--border-subtle)' : 'rgba(0,0,0,0.1)' }}
                >
                    <motion.div
                        className="absolute left-0 w-px h-8"
                        style={{ background: palette.primary }}
                        animate={reduce ? undefined : { y: [-32, 80] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>

            {/* ============ SIDE LABEL ============ */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 z-10">
                <span 
                    className="w-px h-20" 
                    style={{ background: isDark ? 'var(--border-subtle)' : 'rgba(0,0,0,0.1)' }} 
                />
<span
    className="text-[9px] font-bold tracking-[0.5em] uppercase whitespace-nowrap"
    style={{ 
        color: isDark ? 'var(--text-muted)' : '#64748b', 
        writingMode: 'vertical-rl', 
        opacity: 0.55 
    }}
>
    Portfolio · {new Date().getFullYear()}
</span>
                <span 
                    className="w-px h-20" 
                    style={{ background: isDark ? 'var(--border-subtle)' : 'rgba(0,0,0,0.1)' }} 
                />
            </div>
        </section>
    );
};

export default Hero;