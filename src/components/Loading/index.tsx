import React from 'react'
import { Spinner } from 'phosphor-react'
import { motion, Variants } from 'framer-motion'

const LoadingVariant: Variants = {
  visible: {
    rotate: [0, 360, 0],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
}

export function Loading() {
  return (
    <motion.div initial="visible" animate="visible" variants={LoadingVariant}>
      <Spinner weight="bold" className="w-8 h-8 text-white" />
    </motion.div>
  )
}
