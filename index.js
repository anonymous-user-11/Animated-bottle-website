function init(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  
}
init();
gsap.from('.page1 .nav',{
    y:-100,
    duration:2,
    delay:0.3,
    opacity: 0,
  })
  gsap.from('.sectionpart1 h1,.sectionpart1 p',{
      y:80,
      duration:2,
      delay:0.3,
      opacity: 0,
  })
  gsap.from('#lemon',{
      duration:2,
      delay:0.3,
      scale:1,
      opacity: 0,
      rotate:30,
  })
  gsap.to('#img1',{
    duration:2,x:-670,y:10,
    height:530,width:300,
    scrollTrigger:{
      trigger:".page2",
      scroller:"#main",
      start:"top 90%",
      end:"top 4%",
      scrub:3,
    },
  })
  gsap.to('#img2',{
    duration:2,y:-90,x:60,
     height:530,width:300,
       scrollTrigger:{
         trigger:".page2",
         scroller:"#main",
         start:"top 90%",
         end:"top 4%",
         scrub:3,
     },
   })
   gsap.from('#page2h1 h1,#page2h1 h3',{
    y:280,
    duration:2,
    delay:0.3,
    opacity: 0,
    scrollTrigger:{
      trigger:"#page2h1 h1",
      scroller:"#main",
      start:"top 100%",
      end:"top 50%",
      scrub:3,
  },
  })