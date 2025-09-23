const alphabet="ABCDEFGHIKLMNOPQRSTUVWXYZ"; // I/J gộp

function generateTable(key){
  key=key.toUpperCase().replace(/J/g,"I").replace(/[^A-Z]/g,"");
  let seen=new Set(); let arr=[];
  for(const ch of key){ if(!seen.has(ch)){ seen.add(ch); arr.push(ch);} }
  for(const ch of alphabet){ if(!seen.has(ch)) arr.push(ch); }
  let table=[]; for(let i=0;i<5;i++) table.push(arr.slice(i*5,i*5+5));
  return table;
}

function findPos(table,ch){ if(ch==="J")ch="I";
  for(let r=0;r<5;r++) for(let c=0;c<5;c++) if(table[r][c]===ch) return [r,c];
}

function preprocess(text){
  text=text.toUpperCase().replace(/J/g,"I").replace(/[^A-Z]/g,"");
  let pairs=[]; let i=0;
  while(i<text.length){
    let a=text[i]; let b=(i+1<text.length)?text[i+1]:"X";
    if(a===b){ pairs.push(a+"X"); i++; } else { pairs.push(a+b); i+=2; }
  }
  if(pairs[pairs.length-1].length===1) pairs[pairs.length-1]+="X";
  return pairs;
}

function encodePair(p,table){
  let [r1,c1]=findPos(table,p[0]);
  let [r2,c2]=findPos(table,p[1]);
  if(r1===r2) return table[r1][(c1+1)%5]+table[r2][(c2+1)%5];
  if(c1===c2) return table[(r1+1)%5][c1]+table[(r2+1)%5][c2];
  return table[r1][c2]+table[r2][c1];
}

function mahoa(){
  const text=document.getElementById("text").value;
  const key=document.getElementById("key").value;
  document.getElementById("steps").style.display="block";

  if(!text||!key){
    document.getElementById("step1").innerHTML="<div class='error'>Nhập văn bản và khóa!</div>";
    return;
  }

  // B1: tạo bảng
  const table=generateTable(key);
  let html="<div class='step-title'>Bước 1: Tạo bảng 5x5 từ khóa</div><table class='alphabet-table'>";
  for(const row of table){ html+="<tr>"+row.map(c=>`<td>${c}</td>`).join("")+"</tr>"; }
  html+="</table>";
  document.getElementById("step1").innerHTML=html;

  // B2: chia cặp
  const pairs=preprocess(text);
  document.getElementById("step2").innerHTML=`<div class='step-title'>Bước 2: Chia bản rõ thành cặp</div><div>${pairs.join(" | ")}</div>`;

  // B3: mã hóa từng cặp
  let results=[]; let result="";
  for(const p of pairs){ let c=encodePair(p,table); results.push(`${p}→${c}`); result+=c; }
  document.getElementById("step3").innerHTML=`<div class='step-title'>Bước 3: Mã hóa từng cặp</div><div>${results.join(", ")}</div>`;
  document.getElementById("result").innerHTML=`<div style="background:#e8f5e8;padding:10px;border-radius:5px;">Văn bản mã hóa: <strong>${result}</strong></div>`;
}

function decodePair(p,table){
  let [r1,c1]=findPos(table,p[0]);
  let [r2,c2]=findPos(table,p[1]);
  if(r1===r2) return table[r1][(c1+4)%5]+table[r2][(c2+4)%5]; // dịch trái
  if(c1===c2) return table[(r1+4)%5][c1]+table[(r2+4)%5][c2]; // dịch lên
  return table[r1][c2]+table[r2][c1];
}

function giaima(){
  const text=document.getElementById("text").value;
  const key=document.getElementById("key").value;
  document.getElementById("steps").style.display="block";

  if(!text||!key){
    document.getElementById("step1").innerHTML="<div class='error'>Nhập văn bản và khóa!</div>";
    return;
  }

  // B1: tạo bảng
  const table=generateTable(key);
  let html="<div class='step-title'>Bước 1: Tạo bảng 5x5 từ khóa</div><table class='alphabet-table'>";
  for(const row of table){ html+="<tr>"+row.map(c=>`<td>${c}</td>`).join("")+"</tr>"; }
  html+="</table>";
  document.getElementById("step1").innerHTML=html;

  // B2: chia cặp
  let pairs=[]; for(let i=0;i<text.length;i+=2) pairs.push(text.slice(i,i+2));
  document.getElementById("step2").innerHTML=`<div class='step-title'>Bước 2: Chia bản mã thành cặp</div><div>${pairs.join(" | ")}</div>`;

  // B3: giải mã từng cặp
  let results=[]; let result="";
  for(const p of pairs){ let dec=decodePair(p,table); results.push(`${p}→${dec}`); result+=dec; }
  document.getElementById("step3").innerHTML=`<div class='step-title'>Bước 3: Giải mã từng cặp</div><div>${results.join(", ")}</div>`;
  document.getElementById("result").innerHTML=`<div style="background:#e8f5e8;padding:10px;border-radius:5px;">Văn bản giải mã: <strong>${result}</strong></div>`;
}

