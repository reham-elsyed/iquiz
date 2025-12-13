'use client'
import React from 'react';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur', 'ps', 'syr', 'dv']);
const RTL_CHARS_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

interface AutoDirectionTextProps {
    text?: string;
    className?: string;
    children?: React.ReactNode;
    forceDirection?: 'ltr' | 'rtl' | 'auto';
    forceLocale?: string;
    as?: keyof JSX.IntrinsicElements;
}

type AutoDirectionTextComponentProps<T extends keyof JSX.IntrinsicElements = 'span'> = AutoDirectionTextProps & Omit<React.ComponentPropsWithoutRef<T>, keyof AutoDirectionTextProps>;

export default function AutoDirectionText<T extends keyof JSX.IntrinsicElements = 'span'>(
    { text, className = '', children, forceDirection, forceLocale, as: Component = 'span', ...props }:
        AutoDirectionTextComponentProps<T>
) {
    const { i18n } = useTranslation();
    const currentLocale = forceLocale ?? i18n.language ?? 'en';

    const direction = useMemo(() => {
        // If forced direction, use it
        if (forceDirection && forceDirection !== 'auto') {
            return forceDirection;
        }

        // FIRST: Check text content
        const content = text || (typeof children === 'string' ? children : '');

        if (content) {
            const textContent = typeof content === 'string'
                ? content
                : extractTextFromReactNode(content);

            const hasRTL = RTL_CHARS_REGEX.test(textContent);

            // If text has RTL characters, use RTL
            if (hasRTL) return 'rtl';

            // If text has only LTR characters, use LTR (regardless of locale)
            const hasLTR = /[A-Za-z]/.test(textContent);
            if (hasLTR && !hasRTL) return 'ltr';
        }

        // SECOND: Fallback to locale-based detection
        if (RTL_LOCALES.has(currentLocale)) return 'rtl';

        // DEFAULT: LTR
        return 'ltr';
    }, [text, children, forceDirection, currentLocale]);
    const content = text || children;

    return (
        <Component
            dir={direction}
            lang={direction === 'rtl' ? 'ar' : i18n.language}
            className={className}
            data-direction={direction}
            {...props}
        >
            {content}
        </Component>
    );
}

// Helper to extract text from React nodes
function extractTextFromReactNode(node: React.ReactNode): string {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('');
    if (node && typeof node === 'object' && 'props' in node) {
        return extractTextFromReactNode(node.props.children);
    }
    return '';
}