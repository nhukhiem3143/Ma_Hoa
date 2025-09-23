function mahoa(){
    const text=document.getElementById("text").value.toUpperCase();
    const permInput=document.getElementById("perm").value;
    document.getElementById("steps").style.display="block";
  
    if(!text||!permInput){
      document.getElementById("step1").innerHTML="<div class='error'>Nhập văn bản và hoán vị!</div>";
      return;
    }
  
    const perm=permInput.split(",").map(x=>parseInt(x));
    const k=perm.length;
  
    // B1: chia khối
    let blocks=[];
    for(let i=0;i<text.length;i+=k) blocks.push(text.slice(i,i+k).padEnd(k,"X"));
    document.getElementById("step1").innerHTML=`<div class='step-title'>Bước 1: Chia văn bản thành khối</div><div>${blocks.join(" | ")}</div>`;
  
    // B2: áp dụng hoán vị
    let encodedBlocks=[];
    for(const bl of blocks){
      let newBl="";
      for(let i=0;i<k;i++) newBl+=bl[perm[i]];
      encodedBlocks.push(newBl);
    }
    document.getElementById("step2").innerHTML=`<div class='step-title'>Bước 2: Áp dụng hoán vị ${perm}</div><div>${encodedBlocks.join(" | ")}</div>`;
  
    // Kết quả
    let result=encodedBlocks.join("");
    document.getElementById("result").innerHTML=`<div style="background:#e8f5e8;padding:10px;border-radius:5px;">Văn bản mã hóa: <strong>${result}</strong></div>`;
  }
  
function giaima(){
  const text=document.getElementById("text").value.toUpperCase();
  const permInput=document.getElementById("perm").value;
  document.getElementById("steps").style.display="block";

  if(!text||!permInput){
    document.getElementById("step1").innerHTML="<div class='error'>Nhập văn bản và hoán vị!</div>";
    return;
  }

  const perm=permInput.split(",").map(x=>parseInt(x));
  const k=perm.length;

  // B1: chia khối
  let blocks=[];
  for(let i=0;i<text.length;i+=k) blocks.push(text.slice(i,i+k));
  document.getElementById("step1").innerHTML=`<div class='step-title'>Bước 1: Chia văn bản mã thành khối</div><div>${blocks.join(" | ")}</div>`;

  // B2: đảo ngược hoán vị
  let invPerm=[]; for(let i=0;i<k;i++) invPerm[perm[i]]=i;
  let decodedBlocks=[];
  for(const bl of blocks){
    let newBl="";
    for(let i=0;i<k;i++) newBl+=bl[invPerm[i]];
    decodedBlocks.push(newBl);
  }
  document.getElementById("step2").innerHTML=`<div class='step-title'>Bước 2: Áp dụng hoán vị ngược ${invPerm}</div><div>${decodedBlocks.join(" | ")}</div>`;

  // Kết quả
  let result=decodedBlocks.join("").replace(/X+$/,"");
  document.getElementById("result").innerHTML=`<div style="background:#e8f5e8;padding:10px;border-radius:5px;">Văn bản giải mã: <strong>${result}</strong></div>`;
}

  