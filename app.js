// Small random sum quiz app matching the screenshot behaviour
(function(){
  const countInput = document.getElementById('count');
  const submitBtn = document.getElementById('submit');
  const expressionDiv = document.getElementById('expression');
  const answersDiv = document.getElementById('answers');
  const messageDiv = document.getElementById('message');

  function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min }

  // generate N random signed integers each in [-1000,1000]
  function generateNumbers(n){
    const nums = [];
    for(let i=0;i<n;i++){
      // generate between -1000 and 1000 excluding 0 maybe? keep 0 allowed
      nums.push(randInt(-1000,1000));
    }
    return nums;
  }

  function computeExpressionParts(nums){
    // for display, we will show: num0 + num1 + num2 - num3 - num4 ... alternate + and - maybe per screenshot
    const parts = [];
    for(let i=0;i<nums.length;i++){
      if(i>0){
        const op = (i % 2 === 0) ? '+' : '-';
        parts.push({type:'op', value:op});
      }
      parts.push({type:'num', value:nums[i]});
    }
    return parts;
  }

  function evaluateParts(parts){
    // reconstruct and compute value left-to-right using ops between numbers
    let value = 0;
    let expectingNum = true;
    let currentOp = '+';
    for(const p of parts){
      if(p.type === 'num'){
        const v = p.value;
        if(currentOp === '+') value += v; else value -= v;
      } else if(p.type === 'op'){
        currentOp = p.value;
      }
    }
    return value;
  }

  function shuffle(array){
    for(let i=array.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function makeWrongAnswers(correct, count){
    const set = new Set();
    set.add(correct);
    const wrongs = [];
    while(wrongs.length < count){
      // produce variations: +/- small, random within wider range, swap digits
      const variation = (()=>{
        const r = Math.random();
        if(r<0.4){ // small offset
          return correct + randInt(-50,50);
        } else if(r<0.7){
          return correct + randInt(-200,200);
        } else {
          return randInt(correct-1000, correct+1000);
        }
      })();
      if(!set.has(variation)){
        set.add(variation);
        wrongs.push(variation);
      }
    }
    return wrongs;
  }

  function renderExpression(parts){
    expressionDiv.innerHTML = '';
    parts.forEach(p=>{
      const el = document.createElement('div');
      el.className = p.type === 'num' ? 'box' : 'op';
      el.textContent = p.type === 'num' ? p.value : p.value;
      expressionDiv.appendChild(el);
    });
  }

  function renderAnswers(correct){
    answersDiv.innerHTML = '';
    const answers = [correct].concat(makeWrongAnswers(correct,8));
    shuffle(answers);
    answers.forEach(a=>{
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = a;
      btn.addEventListener('click', ()=>{
        if(a === correct){
          messageDiv.textContent = 'ถูกต้อง 🎉 สุ่มใหม่แล้ว';
          messageDiv.style.color = '#2e7d32';
          setTimeout(()=>{
            // regenerate
            generateAndRender();
          },800);
        } else {
          messageDiv.textContent = 'ผิด ลองใหม่อีกครั้ง';
          messageDiv.style.color = '#d32f2f';
        }
      });
      answersDiv.appendChild(btn);
    });
  }

  function generateAndRender(){
    messageDiv.textContent = '';
    const n = parseInt(countInput.value,10) || 5;
    // keep within reasonable bounds: min 1, max 20
    const N = Math.max(1, Math.min(20, n));
    const nums = generateNumbers(N);
    // For display, ensure digits of numbers are in range 3-digit? but we follow generation [-1000,1000]
    const parts = computeExpressionParts(nums);
    const correct = evaluateParts(parts);
    renderExpression(parts);
    renderAnswers(correct);
  }

  submitBtn.addEventListener('click', ()=>{
    generateAndRender();
  });

  // initial render
  generateAndRender();
})();
