$(document).ready(function () {
    $('.deleteuser').on('click', deleteUser);
});

function deleteUser() {
    event.preventDefault();

    var confirmation = confirm('Are you Sure?');

    if (confirmation) {
        $.ajax({
            type : 'Delete',
            url : '/displayUser/' + $('.deleteuser').data('user')
        }).done(function(response){
            window.location.replace('/users')
        });
    } else {
        return false;
    }
}