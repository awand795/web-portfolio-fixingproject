import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

function FadeInWhenVisible({ children }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            variants={{
                visible: { scale: 1 },
                hidden: { scale: 0 }
            }}
        >
            {children}
        </motion.div>
    );
}

export default FadeInWhenVisible;