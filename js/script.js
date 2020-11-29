let app = new Vue({
    el: "#app",
    data: {
        evidences_found: [],
        possible_evidences: [0, 1, 2, 3, 4, 5],
        possible_ghosts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        evidences: [
            { id: 0, "name": "emf level 5" },
            { id: 1, "name": "ghost writing" },
            { id: 2, "name": "fingerprints" },
            { id: 3, "name": "spirit box" },
            { id: 4, "name": "temperature" },
            { id: 5, "name": "ghost orb" }
        ],
        ghosts: [
            { name: 'Banshee', evidences: [0, 2, 4] },
            { name: 'Demon', evidences: [1, 3, 4] },
            { name: 'Jinn', evidences: [0, 3, 5] },
            { name: 'Mare', evidences: [3, 4, 5] },
            { name: 'Oni', evidences: [0, 1, 3] },
            { name: 'Phantom', evidences: [0, 4, 5] },
            { name: 'Poltergeist', evidences: [2, 3, 5] },
            { name: 'Revenant', evidences: [0, 1, 2] },
            { name: 'Shade', evidences: [0, 1, 5] },
            { name: 'Spirit', evidences: [1, 2, 3] },
            { name: 'Wraith', evidences: [2, 3, 4] },
            { name: 'Yurei', evidences: [1, 4, 5] },
        ]
    },
    mounted: function () {
        this.ghosts = this.ghosts.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })

        this.possible_ghosts = this.find_possible_ghosts()
    },
    methods: {
        change_evidence: function (evidence) {
            if (this.evidences_found.length === 3 && this.evidences_found.indexOf(evidence.id) < 0 && this.possible_evidences.indexOf(evidence.id) < 0) return
            let index = this.evidences_found.indexOf(evidence.id)
            if (index >= 0) {
                this.evidences_found.splice(index, 1)
            } else {
                this.evidences_found.push(evidence.id)
            }
            this.possible_evidences = this.find_possible_evidences()
            this.possible_ghosts = this.find_possible_ghosts()
        },
        check_if_disabled: function (evidence) {
            if (evidence.checked) return false

            for (let ghost of this.ghosts) { }
        },
        find_possible_ghosts: function () {
            if (this.evidences_found.length == 0) return this.ghosts
            return this.ghosts.filter((ghost) => {
                let count = 0
                for (found of app.evidences_found) {
                    if (ghost.evidences.indexOf(found) >= 0) count++
                }
                return count >= app.evidences_found.length
            })
        },
        find_possible_evidences: function () {
            let return_evidences = [];
            for (let ghost of this.find_possible_ghosts()) {
                for (let evidence of ghost.evidences) {
                    if (app.evidences_found.indexOf(evidence) >= 0) continue;
                    if (return_evidences.indexOf(evidence) < 0) return_evidences.push(evidence)
                }
            }
            return return_evidences
        },
        set_ghost: function (ghost) {
            this.evidences_found = JSON.parse(JSON.stringify(ghost.evidences))
            this.possible_evidences = this.find_possible_evidences()
            this.possible_ghosts = this.find_possible_ghosts()
        }
    }
})