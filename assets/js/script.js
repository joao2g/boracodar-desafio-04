const chat = {
    headerTime: document.querySelector("#header-time"),
    sectionSender: document.querySelector(".sender"),
    message: document.querySelector(".sender blockquote"),
    buttonBackPage: document.querySelector("#close"),
    button: document.querySelector("#message-box button"),
    textArea: document.querySelector("textarea"),
    body: document.querySelector("body"),
    main: document.querySelector("main"),
    hours: new Date().getHours(),
    minuts: new Date().getMinutes(),
    expandTextArea: function() {
        chat.textArea.style.height = Math.min(chat.textArea.scrollHeight, 120) + "px"
    },
    retractTextArea: function() {
        const textAreaIsEmbety = chat.textArea.value === ""

        if(textAreaIsEmbety) {
            chat.textArea.style.height = "auto"
        }
    },
    scrollOfTheFinalPosition: function() {
        chat.body.scrollIntoView(false)
    },
    showCurrentTime: function() {
        chat.hours = new Date().getHours()
        chat.minuts = new Date().getMinutes()

        chat.headerTime.textContent = `Hora ${String(chat.hours).padStart(2, "0")}:${String(chat.minuts).padStart(2, "0")}`
    },
    addTimeInTheMessage: function() {
        return `${String(chat.hours).padStart(2, "0")}:${String(chat.minuts).padStart(2, "0")}`       
    }, 
    backPage: function() {
        const mobile = window.innerWidth <= 768
        
        if(mobile) {
            window.history.back()
        }
    },   
    start: function() {
        chat.textArea.addEventListener("input", chat.expandTextArea)
        chat.textArea.addEventListener("blur", chat.retractTextArea)
        chat.buttonBackPage.addEventListener("click", chat.backPage)
        chat.button.addEventListener("click", user.sendMessage)
        chat.scrollOfTheFinalPosition()

        const showTimeNow = () => { setTimeout(() => { chat.showCurrentTime() }, 0) }
        const updateTimeInfinitely = () => { setInterval(()=> { chat.showCurrentTime() }, 1000) }

        showTimeNow()
        updateTimeInfinitely()
        
    }
}

const user = {
    sendMessage: function() {
        const sectionCopy = chat.sectionSender.cloneNode(true)
        const time = sectionCopy.querySelector("time")
        const blockquote = sectionCopy.querySelector("blockquote")

        const textAreaIsEmbety = chat.textArea.value === ""
        if(!textAreaIsEmbety) {
            time.textContent = chat.addTimeInTheMessage()
            blockquote.textContent = chat.textArea.value
            
            chat.main.appendChild(sectionCopy)
            chat.scrollOfTheFinalPosition()
            chat.textArea.value = ""
            chat.retractTextArea()

            chatBot.sendMessage()

            const userReplied = true
            return userReplied
        }
    }
}

const chatBot = {
    sectionAddressee: document.querySelector(".addressee"),
    messageNumber: -1,
    statusElement: document.querySelector("#status"),
    status: "Escrevendo...",
    message: [
        "Ótimo", 
        "Então eu vou ficar na parte do Back-End 👩‍💻", 
        "Vamos decolar esse foguete 🚀",
    ],
    userReplied: user.sendMessage,
    sendMessage: function() {
        if(chatBot.userReplied) {
            const addressee = chatBot.sectionAddressee.cloneNode(true)
            const messageTime = addressee.querySelector("time")
            const blockquote = addressee.querySelector("blockquote")
            chatBot.messageNumber++
            
            if(chatBot.messageNumber <= 2) {
                chatBot.statusElement.textContent = chatBot.status
                messageTime.textContent = chat.addTimeInTheMessage()
                blockquote.textContent = chatBot.message[chatBot.messageNumber]

                setTimeout(() => {
                    chat.main.appendChild(addressee)
                    chatBot.statusElement.textContent = "Online"
                    chat.scrollOfTheFinalPosition()
                }, 2000)
            }
        }        
    }
}

window.onload = chat.start()
