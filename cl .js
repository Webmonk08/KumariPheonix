document.addEventListener('DOMContentLoaded', () => {
  // Register plugins
  gsap.registerPlugin(CustomEase, Flip, ScrollTrigger)

  // Create custom eases
  CustomEase.create(
    'hop',
    'M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1'
  )

  CustomEase.create(
    'hop2',
    'M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1'
  )

  // Slider Setup
  const sliderData = [
    {
      src: '../media/img1.jpg',
      title: 'Creative Design',
      copy: 'Innovative solutions for modern challenges'
    },
    {
      src: '../media/img2.jpg',
      title: 'Digital Excellence',
      copy: 'Pushing boundaries in digital space'
    },
    {
      src: '../media/img3.jpg',
      title: 'Brand Evolution',
      copy: 'Transforming ideas into reality'
    }
  ]

  let slides = []
  let autoplay
  const sliderContainer = document.getElementById('slider-container')
  const teamHeading = document.querySelector('.team-heading')

  // Initialize slider function
  function initializeSlider () {
    // Clear existing slides
    sliderContainer.innerHTML = ''
    slides = []

    // Create initial slides
    sliderData.forEach((data, i) => {
      const slide = document.createElement('div')
      slide.classList.add('slide')
      slide.style.background = `url(${data.src})`

      switch (i) {
        case 0:
          slide.classList.add('current')
          break
        case 1:
          slide.classList.add('next')
          break
        case sliderData.length - 1:
          slide.classList.add('previous')
          break
      }

      slides.push(slide)
      sliderContainer.appendChild(slide)
    })

    // Clear existing autoplay
    if (autoplay) clearInterval(autoplay)

    // Start new autoplay
    autoplay = setInterval(nextSlide, 5000)

    // Ensure slider is visible
    gsap.to(sliderContainer, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
  }

  // Modified nextSlide function with transitions
  function nextSlide () {
    const isMobile = window.innerWidth <= 768

    slides[0].classList.remove('current')
    slides[0].classList.add('previous', 'change')
    slides[1].classList.remove('next')
    slides[1].classList.add('current')
    slides[2].classList.add('next')

    const last = slides.length - 1
    slides[last].classList.remove('previous')

    const placeholder = slides.shift()
    slides.push(placeholder)

    // Remove change class after transition
    setTimeout(() => {
      placeholder.classList.remove('change')
    }, 1000)
  }

  // Improved responsive layout handler
  function handleResponsiveLayout () {
    const isMobile = window.innerWidth <= 768
    const container = document.querySelector('.cont')

    if (isMobile) {
      // Mobile layout
      gsap.set(sliderContainer, {
        width: '90%',
        left: '50%',
        x: '-50%',
        margin: '0'
      })

      if (container.firstChild !== sliderContainer) {
        if (teamHeading) {
          container.insertBefore(teamHeading, container.firstChild)
        }
        container.insertBefore(sliderContainer, teamHeading.nextSibling)
      }
    } else {
      // Desktop layout
      gsap.set(sliderContainer, {
        width: '70%',
        marginLeft: '38%',
        left: 'auto',
        x: '0'
      })
    }
  }

  // Main timeline setup
  const mainTl = gsap.timeline()
  const revealerTl = gsap.timeline()
  const scalerTl = gsap.timeline()

  // Initially hide slider container and heading
  gsap.set(sliderContainer, { opacity: 0 })
  gsap.set(teamHeading, { opacity: 0, y: 20 })

  // Revealer animation
  revealerTl
    .to('.revealer-1', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1.5,
      ease: 'hop'
    })
    .to(
      '.revealer-2',
      {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'hop'
      },
      '<'
    )

 
  scalerTl.to('.img:first-child', {
    scale: 1,
    duration: 2,
    ease: 'power4.inOut'
  })

  // ScrollTrigger.create({
  //   animation: scalerTl,
  //   trigger: '.cont', // Change this to the appropriate section
  //   start: 'top top', // Starts when top of `.images` reaches 80% of viewport
  //   end: 'bottom bottom',
  //   scrub: true,
  //   markers:true
  // })

  // Animate remaining images
  const images = document.querySelectorAll('.img:not(:first-child)')
  images.forEach(img => {
    scalerTl.to(
      img,
      {
        opacity: 1,
        scale: 1,
        duration: 1.25,
        ease: 'power3.out'
      },
      '>-0.5'
    )
  })

// Main timeline setup
// const mainTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".cont",  // Starts when `.cont` enters the viewport
//         start: "top top%",  // When `.cont` reaches 80% of the viewport
//         end: "bottom 50%",
//         scrub: false,      // No smooth scrolling effect, runs once
//         once: true,        // Ensures it runs only once
//         markers: true      // Debugging markers (remove later)
//     }
// });

// Revealer animation
mainTl
    .to(".revealer-1", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "hop",
    })
    .to(".revealer-2", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "hop"
    }, "<")  // Starts at the same time as the first animation

    // Individual image animations
    .to(".img:first-child", {
        scale: 1,
        duration: 2,
        ease: "power4.inOut",
    })

    .to(".img:not(:first-child)", {
        opacity: 1,
        scale: 1,
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.2 // Stagger effect for images appearing one by one
    }, ">-0.5")  // Starts just before the previous animation ends

    // Move all images to the bottom left
    .add(() => {
        document.querySelectorAll(".cont .img:not(.main)").forEach(img => img.remove());
        const state = Flip.getState(".main");
        const imagesContainer = document.querySelector(".images");
        imagesContainer.classList.add("stacked-container");

        document.querySelectorAll(".main").forEach((img, i) => {
            img.classList.add("stacked");
            img.style.order = i;
        });

        gsap.set(".img.stacked", {
            clearProps: "transform,top,left"
        });

        return Flip.from(state, {
            duration: 2,
            ease: "hop",
            absolute: true,
            stagger: {
                amount: -0.3
            }
        });
    });

  // Add hover effects for navigation
  const navItems = document.querySelectorAll('.nav-item')
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('p'), {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('p'), {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })

  // Window resize event listener
  window.addEventListener('resize', () => {
    handleResponsiveLayout()
  })

  // Slider navigation
  document.getElementById('next-slide').addEventListener('click', e => {
    e.preventDefault()
    clearInterval(autoplay)
    nextSlide()
    autoplay = setInterval(nextSlide, 5000)
  })

  // Handle page visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoplay)
    } else {
      autoplay = setInterval(nextSlide, 5000)
    }
  })

  // Initialize responsive layout
  handleResponsiveLayout()
})
