document.getElementById("form").addEventListener("submit", async e=>{
  e.preventDefault();

  const data = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  const res = await fetch("/contact",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  msg.innerText = "Message Sent!";
});