class BiMap {
    constructor() {
        this.map = new Map();
        this.revMap = new Map();
    }

    set(key, value) {
        this.map.set(key, value);
        this.revMap.set(value, key);
    }

    revSet(revKey, value) {
        this.map.set(value, revKey);
        this.revMap.set(revKey, value);
    }

    get(key) {
        return this.map.get(key);
    }

    revGet(revKey) {
        return this.revMap.get(revKey);
    }

    delete(key) {
        const revKey = this.map.get(key);
        if (revKey === undefined) {
            return false;
        }

        return this.map.delete(key) && this.revMap.delete(revKey);
    }

    revDelete(revKey) {
        const key = this.revMap.get(revKey);
        if (key === undefined) {
            return false;
        }

        return this.map.delete(key) && this.revMap.delete(revKey);
    }
}

export { BiMap };
