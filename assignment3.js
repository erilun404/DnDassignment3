$(() => {

    
 
    
 
    const DND_URL = "https://www.dnd5eapi.co/api/";
    let characterArray = [];
    const getDND = async (url) => {
        try {
            console.log(url)
            let myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let response = await fetch(url, requestOptions)
            if(!response.ok){
                throw new Error(`Cant access ${response.status}`)
            }

            let data = await response.json()
            return data;

        }catch(error) {
            $('.spells').append(`<p>Sorry something went wrong, blame the server ${error}`)
            }
    }
    
    const getChars = () => {
        getDND(DND_URL + "classes").then(classes => {
            classes.results.forEach(item => {
                $('.classes-character').append(`<p class="names">${item.name}</p>`)
                characterArray.push(item.name.toLowerCase())
               
            })
        })
    } 
  getChars();
  
    const getCharSpells = (userInput) => {
        $('.spells').empty();
        $('.get-proficient').empty();
        if(characterArray.includes(userInput)) {
            getDND(DND_URL + "classes/" + userInput + "/spellcasting").then(spells => {
                spells.info.forEach(item => {
                    $('.spells').append(`
                    <div class="description"
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    </div>
                    `)
                })
            })
        }else { 
            $('.spells').append("<p>You have to write a class name!</p>")
            return;  
        }   
    };

    const getProficient = (userInput) => {
        $('.spells').empty();
        $('.get-proficient').empty();
        if(characterArray.includes(userInput)) {
            getDND(DND_URL + "classes/" + userInput + "/multi-classing").then(proficient => {
                $('.get-proficient').append(`<h3 class="multiClassing">This class does not have spell casting, but have proficiencies in:</h3>`)
                proficient.proficiencies.forEach(item => {
                    $('.get-proficient').append(`
                    <div class="description"
                    <h3></h3>
                    <p>${item.name}</p>
                    </div>
                    `)
                })
            })
            
        }else { 
            $('.spells').append("<p>You have to write a class name!</p>")
            return;  
        }  
    }


    $('#classes-name-button').on('click', () => {
        const userInput = $('#classes-input').val().toLowerCase();
        let charProficient = ["barbarian", "fighter", "monk", "rogue"]
        if(charProficient.includes(userInput)) {
            getProficient(userInput)
        }else{
            getCharSpells(userInput)
        }
    })
    
})



