$(document).ready(function(){

    function todo_count(){
        var completed = $("#todo_list").find(".completed").length;
        var not_completed = $("#todo_list").find(".not-completed").length;
        $("#todo_completed_count").text(completed);
        $("#todo_not_completed_count").text(not_completed);
    }

    function todo_list(){
        var todo_list_html = "";

        $.get("https://jsonplaceholder.typicode.com/todos", {}, function(todos){
            if(todos.length){
                for(todo in todos){
                    var completed = todos[todo]["completed"] ? 'completed' : 'not-completed';
                    todo_list_html += '<li class="list-group-item '+completed+'"><span class="todo_text">'+todos[todo]["title"]+'</span></li>';
                } 
            }else{
                todo_list_html = '<li class="list-group-item text-danger">No Data Available</li>';
            }
            $("#todo_list").html(todo_list_html)
            $("#todo_count").html(todos.length)
            todo_count();
        })
    }

    // function filter_refresh(){
    //     $("#todo_list").find(".completed").removeClass("show");
    //     $("#todo_list").find(".not-completed").removeClass("hide");
    // }

    // function filter_all(){
    //     filter_refresh();
    //     $("#todo_list").find(".completed").addClass("show");
    //     $("#todo_list").find(".not-completed").addClass("show");
    // }

    // function filter_completed(){
    //     filter_refresh();
    //     $("#todo_list").find(".completed").addClass("show");
    //     $("#todo_list").find(".not-completed").addClass("hide");
    // }

    // function filter_not_completed(){
    //     filter_refresh();
    //     $("#todo_list").find(".completed").addClass("hide");
    //     $("#todo_list").find(".not-completed").addClass("show");
    // }

    function filter_todos(type = "all"){
        $("#todo_list").find("li").removeClass("show").removeClass("hide");

        switch(type){
            case "all":
                $("#todo_list").find(".completed").addClass("show");
                $("#todo_list").find(".not-completed").addClass("show");
                break;
            case "completed":
                $("#todo_list").find(".completed").addClass("show");
                $("#todo_list").find(".not-completed").addClass("hide");
                break;
            case "not_completed":
                $("#todo_list").find(".completed").addClass("hide");
                $("#todo_list").find(".not-completed").addClass("show");
                break;
        }
    }

    function filter_btn(){
        $(".filter_btn").click(function(){
            var filter_type = $(this).data("filter");
            console.log(filter_type)
            filter_todos(filter_type);
        })
    }

    function init(){
        todo_list();
        filter_btn();
    }

    init();
});