"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import React from 'react'

const FlashCardComponent = ({ isFliped, question, handleFlip }) => {
    console.log(isFliped, "is flipped")
    console.log(question, "question")
    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-2xl">
                <motion.div
                    className="relative h-96 cursor-pointer w-full"
                    onClick={handleFlip}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isFliped ? 'back' : 'front'}
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <Card className="h-full bg-card/95 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-shadow w-full">
                                <CardContent className="p-8 h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge variant="secondary" className="text-xs">
                                            {isFliped ? 'back' : 'front'}
                                        </Badge>
                                        <Button variant="ghost" size="sm" onClick={(e) => {
                                            e.stopPropagation();
                                            handleFlip();
                                        }}>
                                            <RotateCcw className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center w-full">
                                        <div className="text-center space-y-4">
                                            <div className="text-lg leading-relaxed max-w-lg">
                                                {isFliped ? question?.answer : question?.question}
                                            </div>
                                            {!isFliped && (
                                                <p className="text-sm text-muted-foreground">
                                                    Click to reveal answer
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>

    )
}

export default FlashCardComponent