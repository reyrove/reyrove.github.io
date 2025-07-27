function calculateGSM() {
    const weight = parseFloat(document.getElementById("fabricWeight").value);
    const area = parseFloat(document.getElementById("fabricArea").value);
    const result = document.getElementById("gsmResult");
  
    if (isNaN(weight) || isNaN(area) || area === 0) {
      result.textContent = "Please enter valid values.";
      return;
    }
  
    const gsm = (weight / area).toFixed(2);
    result.textContent = `GSM: ${gsm} g/m²`;
  }

  function convert() {
    const value = parseFloat(document.getElementById("inputValue").value);
    const type = document.getElementById("conversionType").value;
    const result = document.getElementById("conversionResult");
  
    if (isNaN(value)) {
      result.textContent = "Please enter a valid number.";
      return;
    }
  
    let converted;
    if (type === "denierToTex") {
      converted = (value / 9).toFixed(2);
      result.textContent = `${value} denier = ${converted} tex`;
    } else {
      converted = (value * 9).toFixed(2);
      result.textContent = `${value} tex = ${converted} denier`;
    }
  }
  
  function calculateThreadCount() {
    const warp = parseFloat(document.getElementById("warpDensity").value);
    const weft = parseFloat(document.getElementById("weftDensity").value);
    const result = document.getElementById("threadCountResult");
  
    if (isNaN(warp) || isNaN(weft)) {
      result.textContent = "Enter valid warp and weft densities.";
      return;
    }
  
    const threadCount = warp + weft;
    result.textContent = `Thread Count: ${threadCount} threads/inch`;
  }
  
  function calculateCost() {
    const gsm = parseFloat(document.getElementById("gsmCost").value);
    const area = parseFloat(document.getElementById("costArea").value);
    const price = parseFloat(document.getElementById("costPerGram").value);
    const result = document.getElementById("costResult");
  
    if (isNaN(gsm) || isNaN(area) || isNaN(price)) {
      result.textContent = "Enter valid GSM, area, and cost per gram.";
      return;
    }
  
    const totalGrams = gsm * area;
    const totalCost = (totalGrams * price).toFixed(2);
    result.textContent = `Estimated Cost: $${totalCost}`;
  }
  
  function convertYarn() {
    const value = parseFloat(document.getElementById("yarnInput").value);
    const type = document.getElementById("yarnType").value;
    const result = document.getElementById("yarnResult");
  
    if (isNaN(value)) {
      result.textContent = "Enter a valid yarn count.";
      return;
    }
  
    let converted;
    if (type === "neToNm") {
      converted = (value * 1.693).toFixed(2);
      result.textContent = `${value} Ne = ${converted} Nm`;
    } else {
      converted = (value / 1.693).toFixed(2);
      result.textContent = `${value} Nm = ${converted} Ne`;
    }
  }
  
  const tpiInput = document.getElementById("tpi");
  const yarnCountInput = document.getElementById("yarnCount");
  const twistTypeInput = document.getElementById("twistType");
  
  const svg = document.getElementById("yarnSVG");
  const twistInfo = document.getElementById("twistInfo");
  const tpiVal = document.getElementById("tpiVal");
  const countVal = document.getElementById("countVal");
  
  function updateYarn() {
    const tpi = parseFloat(tpiInput.value);
    const count = parseFloat(yarnCountInput.value);
    const twist = twistTypeInput.value;
    const color = "#4a90e2"; 
    ;
  
    tpiVal.textContent = tpi;
    countVal.textContent = count;
  
    const turns = Math.min(20, Math.floor(tpi));
    const radius = 30 / count;
    const spacing = 300 / (turns * 2);

    svg.innerHTML = '';
  
    const numFibers = 5;
    for (let f = 0; f < numFibers; f++) {
      let d = `M 150 0 `;
      const fiberOffset = (f - numFibers / 2) * 1.5;
  
      for (let i = 0; i < turns * 2; i++) {
        const isCurveRight = twist === "S" ? i % 2 === 0 : i % 2 !== 0;
        const dx = isCurveRight ? radius : -radius;
        const x = 150 + dx + fiberOffset;
        const y = spacing * (i + 1);
        d += `Q 150 ${y - spacing / 2}, ${x} ${y} `;
      }
  
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", "1.2");
      path.setAttribute("stroke-opacity", "0.7");
      svg.appendChild(path);
    }
  
    twistInfo.textContent = `Visualizing ${twist}-Twist | TPI: ${tpi} | Count: Ne ${count}`;
  }
  function exportPNG() {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.download = "yarn-visualizer.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }
  
  [tpiInput, yarnCountInput, twistTypeInput].forEach(input =>
    input.addEventListener("input", updateYarn)
  );
  
  updateYarn();
  
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX, startY;
  
  const wrapper = document.getElementById("svgWrapper");
  
  wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 3);
    updateTransform();
  });

  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  });
  
  wrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });
  
  wrapper.addEventListener("mouseup", () => isDragging = false);
  wrapper.addEventListener("mouseleave", () => isDragging = false);
  
  function updateTransform() {
    svg.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
  }
  
const helpBtn = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const closeBtn = helpModal.querySelector(".close-btn");

helpBtn.addEventListener("click", () => {
  helpModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  helpModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === helpModal) {
    helpModal.style.display = "none";
  }
});

const textileQuotes = [
  "“Threads of innovation make the fabric of the future. Let’s weave the extraordinary.” — Reyove",
  "“Textile engineering isn’t just about fabric; it’s about shaping the future of fashion, one thread at a time.” — Reyove",
  "“You don’t create fabric, you create the magic behind it.” — Reyove",
  "“The loom isn’t just a tool. It’s the birthplace of creativity and innovation.” — Reyove",
  "“In the world of textiles, the only limit is the thread you dare to weave.” — Reyove",
  "“Textile engineers: The unsung heroes behind every fabric, every design, every future.” — Reyove",
  "“Fabric is the canvas, and we’re the artists painting the future.” — Reyove",
  "“Sass, style, and stitches: That’s how we engineer the next generation of fabric.” — Reyove",
  "“From fiber to fabric, we build the future. No pressure, right?” — Reyove",
  "“Engineering textiles isn’t just science. It’s passion, precision, and a whole lot of flair.” — Reyove",
  "“In every thread, there’s a story waiting to be told.” — Reyove",
  "“Textiles are the unsung heroes of design. We give life to fabric, and fabric gives life to fashion.” — Reyove",
  "“When you stitch with purpose, every fiber holds the power of possibility.” — Reyove",
  "“No one sees the loom, but everyone admires the fabric.” — Reyove",
  "“Every piece of fabric tells a story. As textile engineers, we’re the storytellers.” — Reyove",
  "“Don’t just weave threads, weave dreams into reality.” — Reyove",
  "“We don’t just make textiles. We create the fabric of tomorrow.” — Reyove",
  "“Engineering textiles is a symphony of fibers, patterns, and passion.” — Reyove",
  "“Behind every fabric innovation is a textile engineer pushing the limits of what’s possible.” — Reyove",
  "“Textiles are where art and science meet. We’re the bridge.” — Reyove",
  "“Fabrics aren’t just woven. They’re engineered to shape the future.” — Reyove",
  "“From thread to trend, textile engineers are the true creators of fashion.” — Reyove",
  "“Don’t just design fabric, design the future of style.” — Reyove",
  "“If you think fabric is simple, you haven’t seen what textile engineers can do.” — Reyove",
  "“The future of fashion is in our hands, one fiber at a time.” — Reyove",
  "“Each thread is a chance to innovate, to create, to change the world.” — Reyove",
  "“Textile engineering is where fashion meets functionality.” — Reyove",
  "“Textile engineers don’t just make clothes, we make the fabric of life.” — Reyove",
  "“Threads are the building blocks of the future, and we’re the architects.” — Reyove",
  "“A stitch in time saves style.” — Reyove",
  "“Textile engineers are the silent creators of every new trend.” — Reyove",
  "“We don’t just weave; we craft the fabric of innovation.” — Reyove",
  "“Fabrics are our canvas, and we’re the artists with the thread.” — Reyove",
  "“Textiles are not just materials, they are the foundation of creativity.” — Reyove",
  "“Every fiber holds the potential to change the world.” — Reyove",
  "“The art of textile engineering: turning raw materials into wearable masterpieces.” — Reyove",
  "“We don’t just design clothes. We design the future of style.” — Reyove",
  "“In every fiber, there’s a possibility to transform the world.” — Reyove",
  "“Textile engineers create the building blocks of fashion. We make dreams tangible.” — Reyove",
  "“The beauty of textile engineering is that it’s both art and science in perfect harmony.” — Reyove",
  "“Textile engineers are the dreamers behind every thread of fabric.” — Reyove",
  "“Don’t just create fabric, create the future of fashion.” — Reyove",
  "“Textile engineers are like magicians. We turn simple threads into magic.” — Reyove",
  "“Fashion isn’t just what you wear, it’s what we design behind the scenes.” — Reyove",
  "“We don’t just make textiles; we make the impossible, possible.” — Reyove",
  "“In the world of textiles, we’re the ones who make the future unfold.” — Reyove",
  "“Fabric is the foundation of creativity, and we’re the architects.” — Reyove",
  "“Textile engineering is the art of designing the intangible.” — Reyove",
  "“With every stitch, we create a future of possibility.” — Reyove",
  "“In the world of textiles, the sky’s the limit.” — Reyove",
  "“Textiles are the secret ingredient behind every great design.” — Reyove",
  "“The world of fashion is built on the backbone of textile engineering.” — Reyove",
  "“We are the future of fashion. We are the textile engineers.” — Reyove",
  "“Threads are the building blocks. Textile engineers are the creators.” — Reyove",
  "“With every textile innovation, we push the boundaries of possibility.” — Reyove",
  "“We don’t just design fabrics; we design the future of style.” — Reyove",
  "“Every piece of fabric is a canvas. As textile engineers, we paint the future.” — Reyove",
  "“Behind every design, there’s a textile engineer turning ideas into fabric.” — Reyove",
  "“The world’s most beautiful fabrics are crafted by the hands of textile engineers.” — Reyove",
  "“Fashion is created by designers, but textile engineers create the canvas.” — Reyove",
  "“Each new fabric is a new frontier of creativity and innovation.” — Reyove",
  "“Innovation starts with a single thread. We’re the ones who make it happen.” — Reyove",
  "“The world of textiles is filled with possibilities—let’s weave them into reality.” — Reyove",
  "“Engineers of fabric, dreamers of design. We are the creators of the future.” — Reyove",
  "“Textile engineering is not just about fabric. It’s about creating a legacy.” — Reyove",
  "“The future of fashion is woven into the fabric of engineering.” — Reyove",
  "“We are the creators of the fabric that shapes the world.” — Reyove",
  "“Textile engineers: Turning threads into trendsetting innovation.” — Reyove",
  "“Threads hold power. Textile engineers harness that power to create the future.” — Reyove",
  "“Fashion trends come and go, but the power of fabric remains timeless.” — Reyove",
  "“Textile engineering: Where imagination meets precision in every fiber.” — Reyove",
  "“Fabric is our language. Textile engineering is our art.” — Reyove",
  "“We create the threads that shape the world of fashion.” — Reyove",
  "“Textile engineering is the bridge between raw materials and revolutionary design.” — Reyove",
  "“Every textile innovation is a chance to change the world.” — Reyove",
  "“The textile world is our playground. Let’s play with threads of imagination.” — Reyove",
  "“Innovation starts with a thread, and we’re the ones who spin it into magic.” — Reyove",
  "“We turn ideas into fabric, and fabric into future.” — Reyove",
  "“Textile engineers: We don’t just make fabric; we make the impossible happen.” — Reyove",
  "“From concept to creation, textile engineers are the unseen force of fashion.” — Reyove",
  "“Every textile we create is a masterpiece, crafted with vision and precision.” — Reyove",
  "“The best fabrics aren’t born; they’re engineered.” — Reyove",
  "“In the world of textiles, we craft not just fabric, but the future of design.” — Reyove",
  "“Textile engineers: The innovators behind the world’s most iconic fabrics.” — Reyove",
  "“We create fabrics that redefine the possibilities of design.” — Reyove",
  "“A single thread can change the world. It’s up to us to make it happen.” — Reyove",
  "“Textile engineers don’t just work with fibers; we work with the future.” — Reyove",
  "“We engineer the materials that make the future of fashion possible.” — Reyove",
  "“Threads connect us to the past. Textile engineering connects us to the future.” — Reyove",
  "“Textile engineering: The art of turning threads into revolution.” — Reyove",
  "“We don’t just make fabric. We create the building blocks of the future.” — Reyove",
  "“Every innovation starts with a single stitch.” — Reyove",
  "“Threads are the foundation. Engineers are the visionaries.” — Reyove",
  "“Textile engineers are the masterminds behind every great fabric.” — Reyove",
  "“Every fabric has a story. As textile engineers, we write it.” — Reyove",
  "“Textile engineering: Where the future of fashion is woven into reality.” — Reyove",
  "“The thread that binds us to the future is created by textile engineers.” — Reyove"
];

function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * textileQuotes.length);
  const randomQuote = textileQuotes[randomIndex];
  
  document.getElementById("quoteDisplay").textContent = randomQuote;
}

document.getElementById("generateQuoteBtn").addEventListener("click", generateRandomQuote);

generateRandomQuote();