import { gsap } from "@/utils/gsap.utils";

/**
 * Animates a number from 0 to a target value.
 * @param {HTMLElement} element - The DOM element to update.
 * @param {Number} endValue - The final number to count up to.
 * @param {Number} duration - Animation duration in seconds.
 */
export const animateCountUp = (element, endValue, duration = 2) => {
  if (!element) return;

  const target = { val: 0 };

  return gsap.to(target, {
    val: endValue,
    duration: duration,
    ease: "power2.out",
    onUpdate: () => {
      // Math.ceil gives us clean whole numbers as it counts up
      element.innerText = Math.ceil(target.val);
    },
  });
};
