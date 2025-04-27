import { useEffect, useRef } from 'react'
import gsap from 'gsap' // Import core GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import './style.css'
import './sponsors.css'

import flowermp4 from './assets/flower.mp4'
import win from './assets/window.jpg'
import img1 from './assets/1.jpeg'
import img2 from './assets/2.jpeg'
import img3 from './assets/3.webp'
import img4 from './assets/4.jpeg'
import img5 from './assets/5.jpeg'
import p1 from './assets/p1.jpeg'
import p3 from './assets/p3.jpeg'
import p4 from './assets/p4.jpeg'
import p5 from './assets/p5.jpeg'
import sliderimg1 from './assets/img1.jpg'
import sliderimg2 from './assets/img2.jpg'
import sliderimg3 from './assets/img3.jpg'
import sliderimg4 from './assets/img4.jpg'
import sliderimg5 from './assets/img5.jpg'
import sliderimg6 from './assets/img6.jpg'
import sliderimg7 from './assets/img7.jpg'
import sliderimg8 from './assets/img8.jpg'
import b1 from './assets/b1.jpeg'
import b2 from './assets/b2.webp'
import b3 from './assets/b3.jpeg'
import b4 from './assets/b4.jpeg'
import b5 from './assets/b5.webp'

export default function App () {
  const containerRef = useRef(null)
  const sliderContainerRef = useRef(null)
  const teamHeadingRef = useRef(null)
  const revealerTlRef = useRef(null)
  const scalerTlRef = useRef(null)
  const mainTlRef = useRef(null)
  const autoplayRef = useRef(null)
  const slidesRef = useRef([])

  const sliderData = [
    {
      src: sliderimg1,
      title: 'Creative Design',
      copy: 'Innovative solutions for modern challenges'
    },
    {
      src: sliderimg2,
      title: 'Digital Excellence',
      copy: 'Pushing boundaries in digital space'
    },
    {
      src: sliderimg3,
      title: 'Brand Evolution',
      copy: 'Transforming ideas into reality'
    }
  ]

  useEffect(() => {
    // Register plugins - this is critical
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

    // At the start of your useEffect, after registering plugins
    gsap.set(
      '.title span, .txt-bottom, .left-side div, .text-content, .word h1',
      {
        opacity: 1, // Ensure visibility
        y: 0, // Reset any potential transforms
        clearProps: 'all' // Clear any existing GSAP properties
      }
    )
    gsap.to('.img-container', {
      scale: 52,
      ease: 'ease',
      scrollTrigger: {
        trigger: '.video-section',
        scrub: 1,
        start: 'top top',
        end: 'bottom',
        pin: true
      }
    })

    // Modify these ScrollTrigger animations
    gsap.to('.right', {
      autoAlpha: 0,
      x: 500,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.video-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to('.left', {
      autoAlpha: 0,
      x: -500,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.video-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to('.txt-bottom', {
      autoAlpha: 0,
      letterSpacing: -10,
      duration: 2,
      scrollTrigger: {
        start: 2
      }
    })

    const tl = gsap.timeline()

    tl.from('.left-side div', {
      y: 150,
      opacity: 0,
      stagger: {
        amount: 0.4
      },
      delay: 0.5
    })
      .from('.right-side', { opacity: 0, duration: 2 }, 0.5)
      .to('.wrapper', { x: -window.innerWidth })

    ScrollTrigger.create({
      animation: tl,
      trigger: '.wrapper',
      start: 'top top',
      end: '+=600',
      scrub: 1,
      pin: true,
      ease: 'ease'
    })

    gsap.utils.toArray('.columns .col').forEach(image => {
      gsap.fromTo(
        image,
        {
          opacity: 0.3,
          x: 0
        },
        {
          opacity: 1,
          x: -50,
          scrollTrigger: {
            trigger: image,
            start: '10%',
            stagger: {
              amount: 0.4
            }
          }
        }
      )
    })

    const timeline = gsap.timeline()

    // Replace the timeline animation in your useEffect
    timeline
      .fromTo(
        '.title span',
        { y: 150, opacity: 0, skewY: 7 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.2
        }
      )
      .fromTo(
        '.txt-bottom',
        { letterSpacing: -10, opacity: 0 },
        { letterSpacing: 0, opacity: 1, duration: 2 }
      )

    // Initialize timelines
    revealerTlRef.current = gsap.timeline()
    scalerTlRef.current = gsap.timeline()
    mainTlRef.current = gsap.timeline()

    // Initially hide slider container and heading
    gsap.set(sliderContainerRef.current, { opacity: 0 })
    gsap.set(teamHeadingRef.current, { opacity: 0, y: 20 })

    // Set up main timeline with ScrollTrigger
    mainTlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: '+=600 bottom',
        scrub: false,
        once: true
      }
    })

    // Revealer animation
    mainTlRef.current
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
      .to('.slider-img:first-child', {
        scale: 1,
        duration: 2,
        ease: 'power4.inOut'
      })
      .to(
        '.slider-img:not(:first-child)',
        {
          opacity: 1,
          scale: 1,
          duration: 1.25,
          ease: 'power3.out',
          stagger: 0.2
        },
        '>-0.5'
      )
      .add(() => {
        // Move all images to the bottom left
        const mainImages = document.querySelectorAll('.cont .slider-img.main')
        document
          .querySelectorAll('.cont .slider-img:not(.main)')
          .forEach(img => img.remove())

        const state = Flip.getState(mainImages)
        const imagesContainer = document.querySelector('.slider-images')
        imagesContainer.classList.add('stacked-container')

        mainImages.forEach((img, i) => {
          img.classList.add('stacked')
          img.style.order = i
        })

        gsap.set('.slider-img.stacked', {
          clearProps: 'transform,top,left'
        })

        Flip.from(state, {
          duration: 2,
          ease: 'hop',
          absolute: true,
          stagger: {
            amount: -0.3
          },
          onComplete: () => {
            handleResponsiveLayout()
            initializeSlider()

            gsap.to(teamHeadingRef.current, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out'
            })
          }
        })
      })
      .to('.word h1, .nav-item p, .slider-line p', {
        y: 0,
        opacity: 1,
        duration: 3,
        ease: 'hop2',
        stagger: 0.1,
        delay: 1.25
      })
      .to('.cover-img', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 2,
        ease: 'hop',
        delay: -4.75
      })

    // Slider scroll animation
    ScrollTrigger.create({
      animation: scalerTlRef.current,
      trigger: containerRef.current,
      start: 'top -200',
      end: '+=600 bottom',
      scrub: true
    })

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

    // Handle window resize
    window.addEventListener('resize', handleResponsiveLayout)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResponsiveLayout)
      if (autoplayRef.current) clearInterval(autoplayRef.current)

      // Clear ScrollTrigger instances - very important for cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleResponsiveLayout = () => {
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // Mobile layout
      gsap.set(sliderContainerRef.current, {
        width: '90%',
        left: '50%',
        x: '-50%',
        margin: '0'
      })

      if (containerRef.current.firstChild !== sliderContainerRef.current) {
        if (teamHeadingRef.current) {
          containerRef.current.insertBefore(
            teamHeadingRef.current,
            containerRef.current.firstChild
          )
        }
        containerRef.current.insertBefore(
          sliderContainerRef.current,
          teamHeadingRef.current.nextSibling
        )
      }
    } else {
      // Desktop layout
      gsap.set(sliderContainerRef.current, {
        width: '70%',
        marginLeft: '38%',
        left: 'auto',
        x: '0'
      })
    }
  }

  const initializeSlider = () => {
    // Clear existing slides
    if (sliderContainerRef.current) {
      sliderContainerRef.current.innerHTML = ''
      slidesRef.current = []

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
          default:
            break
        }

        slidesRef.current.push(slide)
        sliderContainerRef.current.appendChild(slide)
      })

      // Clear existing autoplay
      if (autoplayRef.current) clearInterval(autoplayRef.current)

      // Start new autoplay
      autoplayRef.current = setInterval(nextSlide, 5000)

      // Ensure slider is visible
      gsap.to(sliderContainerRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      })
    }
  }

  const nextSlide = () => {
    if (slidesRef.current.length >= 3) {
      slidesRef.current[0].classList.remove('current')
      slidesRef.current[0].classList.add('previous', 'change')
      slidesRef.current[1].classList.remove('next')
      slidesRef.current[1].classList.add('current')
      slidesRef.current[2].classList.add('next')

      const last = slidesRef.current.length - 1
      slidesRef.current[last].classList.remove('previous')

      const placeholder = slidesRef.current.shift()
      slidesRef.current.push(placeholder)

      // Remove change class after transition
      setTimeout(() => {
        placeholder.classList.remove('change')
      }, 1000)
    }
  }

  const handleNextSlide = e => {
    e.preventDefault()
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    nextSlide()
    autoplayRef.current = setInterval(nextSlide, 5000)
  }

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (autoplayRef.current) clearInterval(autoplayRef.current)
      } else {
        autoplayRef.current = setInterval(nextSlide, 5000)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    // Immediate fix for text visibility
    setTimeout(() => {
      document
        .querySelectorAll('.title span, .txt-bottom, .left-side div')
        .forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
    }, 100)
  }, [])

  return (
    <>
      {' '}
      <div className='wrapper'>
        <header>
          <nav className='navbar'>
            <span></span>
            <div className='logo'>Kumari Phoenix</div>
            <ul className='menu'>
              <li>
                <a href='#'>about</a>
              </li>
              <li>
                <a href='#'>works</a>
              </li>
              <li>
                <a href='#'>casting</a>
              </li>
              <li>
                <a href='#'>contact</a>
              </li>
            </ul>
            <div className='btn'>instagram</div>
          </nav>
        </header>

        <section className='video-section'>
          <div className='video-container'>
            <video
              src={flowermp4}
              poster='./media/p1.jpeg'
              autoPlay
              loop
              muted
            ></video>
          </div>
          <div className='img-container'>
            <img src={win} alt='' className='img' />
          </div>

          <div className='text-content'>
            <div className='img_txt'>
              <div className='left title sm'>
                <span>between</span>
              </div>
              <div className='left title bg'>
                <span>Reality</span>
              </div>
              <div className='right title bg n'>
                <span>&</span>
              </div>
              <div className='right title bg'>
                <span>Dream</span>
              </div>
            </div>
            <p className='txt-bottom'>shots that will change your mind</p>
          </div>

          <div className='v_container'>
            <div className='left-side'>
              <div className='tv'>
                <div className='bg'>push</div>
                <div className='sm'>the</div>
                <div className='bottom bg'>envelope</div>
              </div>
              <div className='text-container'>
                <p>
                  Photography has become a big part of almost every element of
                  our lives.
                </p>
                <p>
                  It become widespread and diverse but we know that this is
                  still a real form of art and magic.
                </p>
              </div>
            </div>
            <div className='right-side'>
              <p>
                explore works <i className='fa-arrow-right-long fa-solid'></i>
              </p>
            </div>
          </div>
        </section>

        <section className='section'>
          <div className='boxes-container'>
            <div className='columns box1'>
              <div className='col col-1'>
                <img src={img1} alt='' />
                <img src={img2} alt='' />
              </div>
              <div className='col-2'>
                <h1>Carolina</h1>
                <span>28 october 2021</span>
                <div className='line'></div>
                <div className='text-box'>
                  <p>
                    This series is excellently showing that ordinary portrait
                    photography still can be inspiring for you.
                  </p>
                  <p>
                    Check the shots of beautiful Caroline in hat with red and
                    green lights.
                  </p>
                </div>
              </div>
              <div className='col col-3'>
                <img src={img3} alt='' />
                <img src={img4} alt='' />
                <img src={img5} alt='' />
              </div>
            </div>

            <div className='columns box2'>
              <div className='col col-1'>
                <img src={p1} alt='' />
                <img src={p1} alt='' />
              </div>
              <div className='col-2'>
                <h1>soul dance</h1>
                <span>17 september 2021</span>
                <div className='line'></div>
                <div className='text-box'>
                  <p>
                    Beautiful dance of Hanna in neon ligths with retro effect.
                    Pink lights, pretty women and sensuality.
                  </p>
                  <p>
                    Inspiring vibes and invisible beautiful soul on this shots.
                  </p>
                </div>
              </div>
              <div className='col col-3'>
                <img src={p3} alt='' />
                <img src={p4} alt='' />
                <img src={p5} alt='' />
              </div>
            </div>

            <div className='columns box3'>
              <div className='col col-1'>
                <img src={b1} alt='' />
                <img src={b2} alt='' />
                <img src={b3} alt='' />
                <img src={b4} alt='' />
              </div>
              <div className='col-2'>
                <h1>80's vibes</h1>
                <span>1 september 2021</span>
                <div className='line'></div>
                <div className='text-box'>
                  <p>
                    Retro nostagia can be sweet and sour at the same time.
                    Christina helped us to make photos, that will give you this
                    feelings.
                  </p>
                  <p>
                    Drop in past times with this collection of 80's styled
                    photos.
                  </p>
                </div>
              </div>
              <div className='col col-3'>
                <img src={b5} alt='' />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className='cont' ref={containerRef}>
        <div className='revealers'>
          <div className='revealer revealer-1'></div>
          <div className='revealer revealer-2'></div>
        </div>

        <div className='slider-images'>
          <div className='slider-img'>
            <img src={sliderimg1} alt='' />
          </div>
          <div className='slider-img'>
            <img src={sliderimg2} alt='' />
          </div>
          <div className='slider-img'>
            <img src={sliderimg3} alt='' />
          </div>
          <div className='slider-img'>
            <img src={sliderimg4} alt='' />
          </div>
          <div className='slider-img'>
            <img src={sliderimg5} alt='' />
          </div>
          <div className='slider-img main'>
            <img src={sliderimg6} alt='' />
          </div>
          <div className='slider-img main'>
            <img src={sliderimg7} alt='' />
          </div>
          <div className='slider-img main'>
            <img src={sliderimg8} alt='' />
          </div>
        </div>

        <div className='hero-content'>
          <div className='site-logo'>
            <div className='word'>
              <h1>KUMARI</h1>
            </div>
            <div className='word'>
              <h1>
                PHOENIX<sup>&copy;</sup>
              </h1>
            </div>
          </div>
          <div className='cover-img'>
            <img
              style={{ marginTop: '0.70em', borderRadius: '1.3em' }}
              src='/media/img3.jpg'
              alt=''
            />
          </div>
          <div className='site-info'>
            <div className='row'>
              <div className='slider-col'>
                <div className='slider-line'>
                  <p>Feature</p>
                </div>
              </div>
              <div className='slider-col'>
                <h2 className='team-heading' ref={teamHeadingRef}>
                  Team Members
                </h2>
                <div
                  style={{ borderRadius: '1em' }}
                  className='slider-container'
                  id='slider-container'
                  ref={sliderContainerRef}
                >
                  {/* Slides will be added dynamically */}
                </div>
                <div className='slider-nav'>
                  <button id='next-slide' onClick={handleNextSlide}>
                    ›
                  </button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='slider-col'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='spon-container'>
        <div className='header'>
          <h2 className='title'>Excellence In Motion</h2>
        </div>

        <div className='sponsors-section'>
          <div className='sponsors-container'>
            <h3 className='sponsors-title'>Proud sponsors</h3>
            <div className='sponsors-grid'>
              <div className='sponsor-card'>
                <div
                  className='sponsor-image'
                  style={{ backgroundImage: "url('/api/placeholder/300/200')" }}
                ></div>
                <p className='sponsor-name'>Apex Athletics</p>
              </div>
              <div className='sponsor-card'>
                <div
                  className='sponsor-image'
                  style={{ backgroundImage: "url('/api/placeholder/300/200')" }}
                ></div>
                <p className='sponsor-name'>Titan Sports</p>
              </div>
              <div className='sponsor-card'>
                <div
                  className='sponsor-image'
                  style={{ backgroundImage: "url('/api/placeholder/300/200')" }}
                ></div>
                <p className='sponsor-name'>Victory League</p>
              </div>
              <div className='sponsor-card'>
                <div
                  className='sponsor-image'
                  style={{ backgroundImage: "url('/api/placeholder/300/200')" }}
                ></div>
                <p className='sponsor-name'>Champions United</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className='logo'>
          <a href='#'>eraf</a>
        </div>
        <div className='btn'>instagram</div>
      </footer>
    </>
  )
}
