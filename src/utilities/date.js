module.exports = {

    currentDate() {
        let currentDate = new Date()
            
        currentDate.setHours(currentDate.getHours() - 3)
        currentDate.toLocaleString("pt-BR")
        currentDate = new Date(currentDate).toISOString()
  
        return currentDate
    },

    new_date() {
        return new Date()
    }
        
}