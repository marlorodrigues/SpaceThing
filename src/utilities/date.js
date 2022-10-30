module.exports = {

    currentDate() {
        let currentDate = new Date()
            
        currentDate.setHours(currentDate.getHours() - 3)
        currentDate.toLocaleString("pt-BR")
        currentDate = new Date(currentDate).toISOString()
  
        return currentDate
    },

    today() {
        return new Date()
    },

        add_day(days_to_add) {
            const tmp = new Date().setDate(new Date().getDate() + days_to_add);
            return new Date(tmp);
        }
        
}