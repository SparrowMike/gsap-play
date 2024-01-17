import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

console.log('gsap', gsap)

import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="wrapper">
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box d"></div>

    <div class="spacer"></div>
    <div class="container">
      <img src="./images/27059-ai.png" alt="" class="a" />    
      <img src="./images/27059-ai (4).png" alt="" class="e" />    
      <img src="./images/27059-ai (3).png" alt="" class="d" />    
      <img src="./images/27059-ai (2).png" alt="" class="c" />    
      <img src="./images/27059-ai (1).png" alt="" class="b" />    
    </div>
    <div class="spacer"></div>
  </div>
`

const elements = gsap.utils.toArray('.box');

elements.forEach((box, index) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: box,
      endTrigger: elements[index + 1] || null,
      start: '10% 5%', // trigger scroller 
      end: () => '+=70%',
      toggleActions: 'restart pause reverse pause',
      scrub: 2, 
      pin: true, 
      snap: 1 / (elements.length - 1),
    }
  });

  tl.to(box, {
    x: '100%',
    rotation: 90,
    duration: 3,
  });
});

const images = gsap.utils.toArray('.container img');

ScrollTrigger.defaults({
  markers: true,
});

images.forEach((image, index) => {
  ScrollTrigger.create({
    trigger: image,
    start: 'top center',
    end: '+=50%',
    animation: gsap.to(image, {
      y: '-15%',
      duration: index,
    }),
    scrub: index, 
    onEnter: () => console.log('enter', index / 5),
    // onLeave: () => console.log('leave'),
    onUpdate: (self) => {
      // console.log('update', self.progress)
    },
    toggleClass: 'active',
  });
});