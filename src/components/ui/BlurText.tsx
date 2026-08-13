import { motion, useReducedMotion } from 'motion/react'
import styles from './BlurText.module.css'

type Segment = {
  text: string
  accent?: boolean
}

type BlurTextProps = {
  segments: Segment[]
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  id?: string
  delay?: number
  play?: boolean
}

export function BlurText({
  segments,
  className = '',
  as: Tag = 'h1',
  id,
  delay = 0,
  play = true,
}: BlurTextProps) {
  const reduce = useReducedMotion()
  let wordIndex = 0
  const reveal = reduce || play

  return (
    <Tag id={id} className={`${styles.root} ${className}`.trim()}>
      {segments.map((segment, sIdx) => {
        const words = segment.text.trim().split(/\s+/)
        return words.map((word, wIdx) => {
          const i = wordIndex++
          const isLastInSegment = wIdx === words.length - 1
          const isLastOverall =
            sIdx === segments.length - 1 && isLastInSegment
          return (
            <motion.span
              key={`${sIdx}-${wIdx}-${word}`}
              className={`${styles.word} ${segment.accent ? styles.accent : ''}`.trim()}
              initial={
                reduce ? false : { opacity: 0, filter: 'blur(10px)', y: 10 }
              }
              animate={
                reveal
                  ? { opacity: 1, filter: 'blur(0px)', y: 0 }
                  : { opacity: 0, filter: 'blur(10px)', y: 10 }
              }
              transition={{
                duration: 0.32,
                delay: reduce ? 0 : play ? delay + i * 0.022 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {!isLastOverall ? '\u00A0' : ''}
            </motion.span>
          )
        })
      })}
    </Tag>
  )
}
