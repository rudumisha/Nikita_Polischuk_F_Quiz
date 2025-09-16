var state = 0;
let correct_questions = 0;
let start_menu_block = document.querySelector(".start_menu_block");
let start_game_random_button = start_menu_block.querySelector("#random_game_btn");
let game_block = document.querySelector(".game_block");
let editor_block = document.querySelector(".editor_block");
let end_menu_block = document.querySelector(".end_menu_block");
let game_over_score = document.querySelector("#game_over_score");
let next_button = document.querySelector("#next_button");

function random_int(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class question{
    constructor(ques, answer1, answer2, answer3, correct){
        this.ques = ques;
        this.answers = [answer1, answer2, answer3];
        this.correct = this.answers[correct];
    }
}

let example_tests = [[new question("10+10", "20","10","5", 0),
                     new question("5+5", "20","10","5", 1),
                     new question("512+512", "1002", "1024", "4152", 2),
                     new question("256+128", "256128", 256+128+"", "512", 1),
                     new question("152+516", "668", "678", "713", 0)]
                     ,[new question("10-10", "6","8","0", 2),
                     new question("10-5", "20","10","5", 2),
                     new question("51-6", "31", "45", "62", 1),
                     new question("36-12", "24", "22", "26", 1)],

    // CONTRIB Tests Загальні знання
    [
        new question("Столиця України?", "Київ","Львів","Харків", 0),
        new question("Яка найбільша тварина у світі?", "Слон","Блакитний кит","Білий ведмідь", 1),
        new question("Яка планета найближча до Сонця?", "Меркурій","Земля","Венера", 0),
        new question("Хто написав 'Кобзар'?", "Леся Українка","Тарас Шевченко","Іван Франко", 1),
        new question("Яка мова найпоширеніша у світі?", "Англійська","Китайська","Іспанська", 1)
    ],
    // Ігри
    [
        new question("У якій грі є персонаж Стів?", "Minecraft","Roblox","Fortnite", 0),
        new question("Головний герой серії 'Legend of Zelda'?", "Зельда","Ганон","Лінк", 2),
        new question("У якій грі є мови 'Redstone'?", "Terraria","Minecraft","Roblox", 1),
        new question("Яка гра має карти 'Dust2' і 'Mirage'?", "Valorant","CS:GO","Overwatch", 1)
    ]
    ];

function update_state(){
    if (state == 0){
        start_menu_block.style.display = "block";
        game_block.style.display = "none";
        editor_block.style.display = "none";
        end_menu_block.style.display = "none";
    }
    else if (state == 1){
        start_menu_block.style.display = "none";
        game_block.style.display = "block";
        editor_block.style.display = "none";
        end_menu_block.style.display = "none";
    }
    else if (state == 2){
        start_menu_block.style.display = "none";
        game_block.style.display = "none";
        editor_block.style.display = "block";
        end_menu_block.style.display = "none";
    }
    else if (state == 3){
        start_menu_block.style.display = "none";
        game_block.style.display = "none";
        editor_block.style.display = "none";
        end_menu_block.style.display = "block";
    }
}

function load(){
    update_state();
}

function start_random_game(){
    correct_questions = 0;
    let question_number = 0;
    const test_now = random_int(0, example_tests.length - 1);
    state = 1;
    update_state();
    
    let answer_btns = [game_block.querySelector("#answer_btn1"), 
    game_block.querySelector("#answer_btn2"), 
    game_block.querySelector("#answer_btn3")];

    function update(){
        let question_label = game_block.querySelector("#question_label");
        question_label.innerHTML = example_tests[test_now][question_number].ques;
        for (let i=0; i<answer_btns.length; i++){
            answer_btns[i].innerHTML = example_tests[test_now][question_number].answers[i];
        }
    }
    update();
    for (let i=0; i<answer_btns.length; i++){
        answer_btns[i].onclick = function() {
            if (question_number >= example_tests[test_now].length - 1){
                state = 3;
                update_state();
                game_over_score.innerHTML = `${correct_questions}/${example_tests[test_now].length - 1}`;
                return;
            }
            // Трохи AI коду
            let correct_answer = example_tests[test_now][question_number].correct;
            if (answer_btns[i].innerHTML === correct_answer) {
                correct_questions ++;
            }
            // Кінець AI коду
            question_number++;
            update();
            
        }
    }
}


window.onload = load;
start_game_random_button.addEventListener('click', function() {
    start_random_game();
});

next_button.addEventListener("click", function(){
    state = 0;
    update_state();
});
