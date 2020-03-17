// General helper functions

function checkRoles(highest) {
    // Function to check if user has sufficient privileges.
    let roles = ['Moderator', 'Creator'];

    let check = roles.some(x => highest.includes(x))

    if(check) {
        return true
    } else {
        return false
    }
}

module.exports = { checkRoles }