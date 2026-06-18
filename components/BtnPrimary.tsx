'use client';
import { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

type Props = {
  href: string;
  label: string;
  target?: '_blank';
  rel?: string;
  style?: React.CSSProperties;
};

export default function BtnPrimary({ href, label, target, rel, style: extraStyle }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        background: hovered ? '#A122E2' : '#EEE9F3',
        borderRadius: 12,
        paddingLeft: 16,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        textDecoration: 'none',
        flexShrink: 0,
        transition: 'background 0.2s ease',
        cursor: 'pointer',
        ...extraStyle,
      }}
    >
      <span style={{
        fontFamily: 'var(--font)',
        fontSize: 20,
        fontWeight: 500,
        color: hovered ? '#F1EDF5' : '#101010',
        lineHeight: 1.1,
        whiteSpace: 'nowrap',
        transition: 'color 0.2s ease',
      }}>
        {label}
      </span>
      <span style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: hovered ? '#EEE9F3' : '#A122E2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 0.2s ease',
      }}>
        <ArrowRight size={16} weight="light" color={hovered ? '#A122E2' : '#EEE9F3'} />
      </span>
    </Link>
  );
}
