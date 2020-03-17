function checkRoles(highest) {
    // Function to check if user is a high enough tier.
    let roles = ['Moderator', 'Creator'];

    let check = roles.some(x => highest.includes(x))

    if(check) {
        return true
    } else {
        return false
    }
}

module.exports = { checkRoles }