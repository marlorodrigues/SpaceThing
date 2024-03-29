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
    },

    init_and_end_today(){
        var begin = new Date(new Date().setDate(new Date().getDate() - 1));
        begin = begin.toISOString().split('T')[0]
        
        var end = new Date(new Date().setDate(new Date().getDate()));
        end = end.toISOString().split('T')[0]
        
        const tmp2 = new Date(`${begin} 21:00:00`)
        const tmp3 = new Date(`${end} 21:00:00`)

        return {
            init: tmp2,
            end: tmp3
        }        
    }
        
}