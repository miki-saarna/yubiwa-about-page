// image carousel 
const isSmallScreen = () => {
  return window.matchMedia("(max-width: 767px)").matches;
}

// get our elements
const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

// set up our state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

  
// console.log(is)
// add our event listeners
slides.forEach((slide, index) => {
  
  const slideImage = slide.querySelector('img')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  
  // window.addEventListener('touchstart', () => {
    // console.log(currentIndex)
    // console.log(index)
  // })
  // only (upon initial page load) adds event listeners if screen size is small
  if(isSmallScreen()) {
    
    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
    // mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mousemove', touchMove)
    slide.addEventListener('mouseleave', touchEnd)
    
  }

  // handles changes to window size
  window.addEventListener('resize', () => {
    if(isSmallScreen()) {
      // touch events
      slide.addEventListener('touchstart', touchStart(index))
      slide.addEventListener('touchend', touchEnd)
      slide.addEventListener('touchmove', touchMove)
      // mouse events
      slide.addEventListener('mousedown', touchStart(index))
      slide.addEventListener('mouseup', touchEnd)
      slide.addEventListener('mousemove', touchMove)
      slide.addEventListener('mouseleave', touchEnd)
    } else {
      currentIndex = 0;
      startPos = 0;
      isDragging = false;
      cancelAnimationFrame(animationID);
      slider.classList.remove('grabbing');
      const selected1 = document.querySelector(`.imageSelected1`);
      selected1.classList.add('filled');
      const selected2 = document.querySelector(`.imageSelected2`);
      selected2.classList.remove('filled');
      const selected3 = document.querySelector(`.imageSelected3`);
      selected3.classList.remove('filled');
      
      // touch events
      // slide.removeEventListener('touchstart', touchStart);
      slide.removeEventListener('touchend', touchEnd);
      slide.removeEventListener('touchmove', touchMove);
      // mouse events
      // slide.removeEventListener('mousedown', touchStart);
      slide.removeEventListener('mouseup', touchEnd);
      slide.removeEventListener('mousemove', touchMove);
      slide.removeEventListener('mouseleave', touchEnd);
      
      
    }
  })
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}


// use a HOF so we have index in a closure
function touchStart(index) {
  return function (event) {
    if(isSmallScreen()) {
      currentIndex = index;
      startPos = getPositionX(event)
      isDragging = true
      animationID = requestAnimationFrame(animation)
      slider.classList.add('grabbing')
    }
  }
}

function touchMove(event) {
  // console.log('touchmove')
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function touchEnd() {
  // console.log('touchend')
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) {
      currentIndex += 1;
      // for menu selected bar   
      const selected = menuSelected(currentIndex);
      selected.classList.add("filled");
      // for menu selected bar (prev)  
      const prevIndex = currentIndex - 1;
      const prevSelected = menuSelected(prevIndex);
      prevSelected.classList.remove("filled");
  }
  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
      // for menu selected bar   
      const selected = menuSelected(currentIndex);
      selected.classList.add("filled");
      // for menu selected bar (prev)  
      const prevIndex = currentIndex + 1;
      const prevSelected = menuSelected(prevIndex);
      prevSelected.classList.remove("filled");
  }
  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function menuSelected(index) {
    return document.querySelector(`.imageSelected${index + 1}`);
}
// ==================================

// parallax
// const parallaxRing = document.querySelector(".parallax");

// window.addEventListener("scroll", () => {
//   let offset = window.pageYOffset;
  
//     if(window.innerWidth < 600 ) {
//         parallaxRing.style.objectPosition = `50% ${offset / 7}%`;
//     } else if(window.innerWidth < 1024) {
//         parallaxRing.style.objectPosition = `50% ${(offset) / 13}%`;
//     } else {
//         parallaxRing.style.objectPosition = `0 ${offset / 12}%`;
//     }
// })

// ==================================

// section fade in

const reveal = document.querySelector(".reveal");

window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    let revealPoint = 10;
    if(window.innerWidth < 768) {
      revealPoint = 150
    } else if(window.innerWidth < 1024) {
      revealPoint = 150
    } else if(window.innerWidth < 1200) {
      revealPoint = 150
    } else {
      revealPoint = 150
    }
    if(revealTop < windowHeight - revealPoint) {
        reveal.classList.add('active');
    } else {
        reveal.classList.remove('active');
    }
});

const reveal1 = document.querySelector(".reveal1");

window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    let revealPoint = -2200;
    if(window.innerWidth > 767 && window.innerWidth < 1024) {
      revealPoint = -1400
    } else if(window.innerWidth > 1023 && window.innerWidth < 1200) {
      revealPoint = -1600
    } else if(window.innerWidth > 1199) {
      revealPoint = -2000
    }
    if(revealTop < windowHeight - revealPoint) {
        reveal1.classList.add('active');
    } else {
        reveal1.classList.remove('active');
    }
});

const reveal2 = document.querySelector(".reveal2");

window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    let revealPoint = -1200;
    if(window.innerWidth > 767 && window.innerWidth < 1024) {
      revealPoint = -700
    } else if(window.innerWidth > 1023 && window.innerWidth < 1200) {
      revealPoint = -600
    } else if(window.innerWidth > 1199) {
      revealPoint = -1000
    }
    if(revealTop < windowHeight - revealPoint) {
        reveal2.classList.add('active');
    } else {
        reveal2.classList.remove('active');
    }
});

// ==================================
