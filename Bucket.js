class Bucket {

    constructor() {
        this._utility = new Map()
        this._limit = new Map()
    }

    book(title, definition, dependants) {
        this._utility.set(title, {definition: definition, dependants: dependants})
    }

    limit(title, definition, dependants) {
        this._utility.set(title, {definition: definition, dependants: dependants, limit:true})
    }

    retrieve(title) {
        const a = this._utility.get(title)

        if(this._isClass(a.definition)) {

            if(a.limit) {
                const limitInstance = this._limit.get(title)
                if(limitInstance) {
                    return limitInstance
                } else {
                    const newLimitInstance = this._createInstance(a)
                    this._limit.set(title, newLimitInstance)
                    return newLimitInstance
                }
            }

            return this._instantiateInstance(a)

        } else {
            return a.definition
        }
    }

    _getDependants(service) {
        let classDependants = []
        if(utility.dependants) {
            classDependants = utility.dependants.map((dep) => {
                return this.retrieve(dep)
            })
        }
        return classDependants
    }

    _instantiateInstance(utility) {
        return new utility.definition(...this._getDependencies(utility))
    }

    _isClass(definition) {
        return typeof definition === 'function'
    }
}
export default Bucket
