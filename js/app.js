$(document).ready(function(){       /*so we have started our document.It is a jQuery part. */

    function todo_count(){          /*No para, no return. */
        var completed = $("#todo_list").find(".completed").length;      /*We are taking id of the UL tag,and finding that completed class. Ul is the parent element , and its child is Li tag. So when we will use find(), then it will search in its child element. and then if it will find, then it will give length. */
        var not_completed = $("#todo_list").find(".not-completed").length;      /*Same as it. */
        $("#todo_completed_count").text(completed);         /*By taking the badge id's,we are changing the count. here we can do html() as well. Its just a text, so we have used text(). But While pushing or Li tag in the Ul tag, we cant use text(), we should have to use html(). */
        $("#todo_not_completed_count").text(not_completed);         /*This time , have taken id of not completed. and changing the count. */
    }

    function todo_list(){       /*Here is our todo_list function. */
        var todo_list_html = "";        /*taken a var , in start it will a blank string. */

        $.get("https://jsonplaceholder.typicode.com/todos", {}, function(todos){        /*Used a get function.Here we have brought our datas from server , whose links has been given. if you will copy it , and google it , one file will open, in which every  data is in object dictionary form. So that data, we are storing in a local var called todos.*/
            if(todos.length){       /*we are checking that it has any element or not, if true will execute else not. */
                for(todo in todos){             /*Just looping through, into the todos array. */
                    var completed = todos[todo]["completed"] ? 'completed' : 'not-completed';       /*If you will inspect my application, by doing just ctrl+shift+i. And then go to the network ,then todos file,click on any of the array.It has a index and each index, there are lots of dictionary object are there.Inside it , has a key called completed(simply has boolean value.).so what we are doing here is, at that todo we are cheking that completed key if it is true, then the var is assigned with completed else not-completed. */
                    todo_list_html += '<li class="list-group-item '+completed+'"><span class="todo_text">'+todos[todo]["title"]+'</span></li>';     /*In this, for each todo in todos, our todo_list_html is extending. for each todo, the variable is modified. In this var , we are storing the Li tag with new class called completed or not. and the correspoding in the span tag. */
                } 
            }else{                          /*Else this will execute. simply it will insert li tag with text no data available in ul list by using its id. */
                todo_list_html = '<li class="list-group-item text-danger">No Data Available</li>';
            }
            $("#todo_list").html(todo_list_html)        /*So we have to insert it in the Ul tag, so have taken Ul id, and using html() , just pushing it in Ul list.IN else part, it will be Li tag with text no data avail, but if it will go in the if case, then it has all the Li tags with some dynamic texts, and having new class called complted or not. */
            $("#todo_count").html(todos.length)         /*By taking the id of that badge near to the h2 tag,we are finding the lenght of our todos. In todos, we have all of our values that we got from server, so we are just finding its lenght. */
            todo_count();           /*Now calling a function for rest of the badges that used in the btn group for count of completed or not completed. */
        })
    }

    function filter_todos(type = "all"){                    /*By default , we have initialised with all type, else if that var have different value, then it will change. */
        $("#todo_list").find("li").removeClass("show").removeClass("hide");         /*In that Ul tag,we are finding in Li tags, and removing the classes called show and hide. when the class has show, then those class which has show only , that only be show. same as with hide. */

        switch(type){           /*SO simply at one time, we will click on any one of these three btns.Then at start , type = all. */
            case "all":                 /*if we click all type btn, then it will execute. */
                $("#todo_list").find(".completed").addClass("show");            /*In that Ul tag, we are finding that completed or not completed class , that we have inserted in the todo_list(), if we will get completed, then we will add a class called show. then only those Li tags will be shown , whic has show in their class. */
                $("#todo_list").find(".not-completed").addClass("show");        /*same as above. Like for all, it should show both completed and not completed . so we have taken both. Now we have clicked once on the all type btn, so many of the Li tags has now added with show class. So Now we will remove that class , that we have added. So Now if anyone will press other btn say completed one. then when completed will come, then when that will come inside that function, at that time only, whatever the class that we have added got removed.So this will execute accoring to the switch case. */
                break;
            case "completed":           /*For completed type , we have to show only for completed only. so here we are showing them but not not-completed one. */
                $("#todo_list").find(".completed").addClass("show");
                $("#todo_list").find(".not-completed").addClass("hide");
                break;
            case "not_completed":           /*Here we have to show only not-completed one but not completed one. */
                $("#todo_list").find(".completed").addClass("hide");
                $("#todo_list").find(".not-completed").addClass("show");
                break;
        }
    }

    function filter_btn(){              /*After the todo_list, this function will call. */
        $(".filter_btn").click(function(){              /*SO we have the three btns just below the block btn. If anyone will click any of these btns ,then what will happen ? ... So we are taking class of that btn, you will notice that for every btn , class name is same.Then .. */
            var filter_type = $(this).data("filter");           /*Used this keyword , because in that btn tag only, we have one more attribute called data-filter, which has three different values i.e all, completed, and not-cmplted. So , when we will click any of the btn, it will take that attribute value. and store it in this variable. */
            console.log(filter_type)            /*If you will inspect it , and check it in console, whnever you will click the btn, that will also print there. */
            filter_todos(filter_type);          /*Then kust calling a function, and passing that var. */
        })
    }

    function init(){        /*Function is not taking any parameters, and not returning anything. */
        todo_list();        /*calling a todo_list function.first our program will go in this func.*/
        filter_btn();       /*calling a filter_btn function */
    }

    init();         /*Our program starts from here. */
});