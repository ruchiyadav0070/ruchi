async function upload(){
 let jd=document.getElementById("jd").value;
 let files=document.getElementById("files").files;
 let fd=new FormData();
 fd.append("jd",jd);
 for(let f of files) fd.append("files",f);
 let r=await fetch("http://127.0.0.1:5000/score", {method:"POST", body:fd});
 document.getElementById("out").textContent=await r.text();
}