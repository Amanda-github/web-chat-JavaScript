// console.log("hello world");
//insert background image 
// src = document.querySelector('body').style.backgroundImage = "url('image.jpg')"
$(document).ready(() => {
    $.ajax({
        method: 'get',
        url: 'https://next-message-board.herokuapp.com/messages',
        success: function (messages) {
            console.log(messages)
            $('#board').html('')
            messages.forEach((msg, index) => {
                $('#board').append(`
            <div class="card text-center" style="width: 300px;">
              <div class="card-body">
                <p>${msg.text}</p>
              </div>
              <div class="card-footer text-muted">
                ${moment(msg.created_at).format('MMMM D, YYYY - h:mmA')}
              </div>
              <button id="${msg.id}" class="delete-btn">Delete</button>
            </div>
              `)
            })
        }
    })
    $('form').on('submit', function (e) {
        //prevent function (e) runs from refreshing before running the below codes
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: 'https://next-message-board.herokuapp.com/messages',
            data: {
                text: $('#text-input').val()
            },
            success: function (response) {
                console.log(response)
                $('#board').prepend(
                    `<div id = "content" class="card text-center" style="width: 300px;">
                    ${response.message.text}
                    <br>
                    <br>
                    ${moment([0].created_at).format('MMMM D, YYYY - h:mmA')}
                    <br>
                    <button id="${response.message.id}" class="delete-btn">Delete</button>
              </div> `)
                document.getElementById("text-input").value = "";
                //console.log(response)
            },
            error: function (error) {
                console.log(error)
            }
        })
    })
    $.ajax({
        method: 'get',
        url: 'https://next-message-board.herokuapp.com/messages',
        beforeSend: function () {
            $("#loader").show();
        },
        success: function (data) {
            $("#loader").hide();

        }
    })
})

$('#board').on('click', '.delete-btn', function (e) {
    e.preventDefault()
    console.log(e.target.parentNode)
    $.ajax({
        method: 'post',
        url: `https://next-message-board.herokuapp.com/messages/delete/${e.target.id
            }`,
        success: function (data) {
            e.target.parentNode.remove()

        }

    })
})


