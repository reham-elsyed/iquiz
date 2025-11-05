"use client";

import React from "react";
import { motion } from "framer-motion";
import { Book, Zap, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// This file is meant for use as: app/about/page.tsx (Next.js App Router)
// It uses Tailwind classes, shadcn components, framer-motion, and lucide-react icons.

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen py-12 px-6 md:px-12 lg:px-24 font-sans">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                variants={container}
                className="max-w-6xl mx-auto space-y-12"
            >
                {/* HERO */}
                <motion.section variants={fadeUp} className="grid gap-6 md:grid-cols-2 items-center">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                            Mentora <span className="text-[color:var(--color-primary)]">—</span> Your smarter study partner
                        </h1>
                        <p className="mt-4 text-lg max-w-xl text-[color:var(--color-muted-foreground)]">
                            Turn notes into questions, flashcards, and focused study sessions. Create, save, retake,
                            and track progress — all in one friendly, modern learning workspace.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button variant="default" asChild>
                                <a href="/login">Login</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/app">Start learning</a>
                            </Button>
                        </div>
                    </div>

                    <motion.div
                        variants={fadeUp}
                        className="relative rounded-2xl p-6 shadow-md bg-[color:var(--color-card)]"
                        style={{ border: '1px solid var(--color-border)' }}
                    >
                        <div className="absolute -left-6 -top-8 w-36 h-36 rounded-full bg-[color:var(--aurora-1)]/20 blur-3xl" />
                        <Card className="bg-transparent shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Quick Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-[color:var(--color-muted-foreground)]">
                                    Generate MCQs and open-ended questions, convert them into flashcards, then review
                                    using spaced repetition and session timers.
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <MiniFeature icon={<Book size={18} />} title="Quiz Generator" desc="MCQ + Open-ended" />
                                    <MiniFeature icon={<Zap size={18} />} title="Flashcards" desc="Auto-generate + SRS" />
                                    <MiniFeature icon={<Clock size={18} />} title="Study Sessions" desc="Timers & streaks" />
                                    <MiniFeature icon={<CheckCircle size={18} />} title="Progress" desc="Save & retake" />
                                </div>

                                <div className="text-xs text-[color:var(--color-muted-foreground)]">No account needed to preview basic features.</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.section>

                <Separator />

                {/* MISSION */}
                <motion.section variants={fadeUp} className="space-y-4">
                    <h2 className="text-2xl font-bold">Our mission</h2>
                    <p className="text-[color:var(--color-muted-foreground)] max-w-3xl">
                        At Mentora, we believe learning should be active, confident, and personalized. We turn your
                        study material into meaningful practice — with AI-generated quizzes, smart flashcards, and
                        study sessions tailored to your pace. Our goal is to help you retain knowledge more efficiently and
                        build real mastery.
                    </p>
                </motion.section>

                {/* FEATURES */}
                <motion.section variants={fadeUp} className="grid gap-6 md:grid-cols-3">
                    <FeatureCard
                        icon={<Book size={20} />}
                        title="AI Quiz Generation"
                        desc={`Create multiple choice and open-ended questions from any text. Choose difficulty, mix question types, and
            export sets for review.`}
                    />

                    <FeatureCard
                        icon={<Zap size={20} />}
                        title="Smart Flashcards"
                        desc={`Automatically convert questions and notes into flashcards. Use spaced repetition to retain information longer.`}
                    />

                    <FeatureCard
                        icon={<CheckCircle size={20} />}
                        title="Feedback & Progress"
                        desc={`Instant feedback on quizzes and flashcard sessions, performance metrics, and the ability to save & retake quizzes.`}
                    />
                </motion.section>

                <Separator />

                {/* DESIGN PHILOSOPHY */}
                <motion.section variants={fadeUp} className="space-y-4">
                    <h3 className="text-xl font-semibold">Design & experience</h3>
                    <p className="text-[color:var(--color-muted-foreground)] max-w-3xl">
                        Built to be friendly and modern, Mentora focuses on clarity and flow. Minimal distractions,
                        thoughtful animations, and clear feedback loops help you keep momentum while studying.
                        We use lightweight micro-interactions (via Framer Motion) so the UI feels lively without
                        getting in the way of your learning.
                    </p>
                </motion.section>

                <Separator />

                {/* CTA FOOTER */}
                <motion.footer variants={fadeUp} className="rounded-2xl p-6 bg-[color:var(--color-card)] flex items-center justify-between"
                    style={{ border: '1px solid var(--color-border)' }}>
                    <div>
                        <h4 className="text-lg font-bold">Ready to level up your study sessions?</h4>
                        <p className="text-[color:var(--color-muted-foreground)]">Sign in to save progress, track performance, and start improving.</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="default" asChild>
                            <a href="/login">Login</a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/app">Start learning</a>
                        </Button>
                    </div>
                </motion.footer>
            </motion.div>
        </main>
    );
}

function MiniFeature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center bg-[color:var(--aurora-4)]/20">
                <div className="text-[color:var(--aurora-4)]">{icon}</div>
            </div>
            <div>
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs text-[color:var(--color-muted-foreground)]">{desc}</div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <Card className="p-4">
            <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-[color:var(--aurora-1)]/10">{icon}</div>
                    <div className="text-lg font-semibold">{title}</div>
                </div>
                <p className="text-[color:var(--color-muted-foreground)] text-sm">{desc}</p>
            </CardContent>
        </Card>
    );
}
