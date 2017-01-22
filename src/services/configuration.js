export class Configure {
    constructor() {
        this.environment = "default";
        this.environments = {
            development: ["localhost"],
            staging: ["24sevenleads.azurewebsites.net"]
            //production: ["cms.gigantisch.nl"] --> default environment
        };

        this.settings = {
            "api": {
                "endpoint": "https://24sevenleads.azurewebsites.net/api"
            },
            "staging": {
                "api": {
                    "endpoint": "https://24sevenleads.azurewebsites.net/api"
                }
            },
            "development": {
                "api": {
                    "endpoint": "http://localhost:65179/api"
                }
            }
        };

        this.setEnvironment();
    }

    setEnvironment() {
        let hostname = window.location.hostname;

        // Check we have environments we can loop
        if (this.environments) {
            // Loop over supplied environments
            for (let env in this.environments) {
                // Get environment hostnames
                let hostnames = this.environments[env];

                // Make sure we have hostnames
                if (hostnames) {
                    // Loop the hostnames
                    for (let host of hostnames) {
                        if (hostname.search(host) !== -1) {
                            this.environment = env;
                            // We have successfully found an environment, stop searching
                            return;
                        }
                    }
                }
            }
        }
    }

    /**
     * Get
     * Gets a configuration value from the main config object
     * with support for a default value if nothing found
     *
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    get(key, defaultValue = null) {
        // By default return the default value
        let returnVal = defaultValue;

        // Singular non-namespaced value
        if (key.indexOf(".") === -1) {
            // Using default environment
            if (!this.environmentEnabled()) {
                return this.settings[key] ? this.settings[key] : defaultValue;
            } else {
                if (this.environmentExists()) {
                    // Value exists in environment
                    if (this.settings[this.environment][key]) {
                        returnVal = this.settings[this.environment][key];
                        // Get default value from non-namespaced section if enabled
                    } else if (this.cascadeMode && this.settings[key]) {
                        returnVal = this.settings[key];
                    }
                }

                return returnVal;
            }
        } else {
            let splitKey = key.split(".");
            let parent = splitKey[0];
            let child = splitKey[1];

            if (!this.environmentEnabled()) {
                if (this.settings[parent]) {
                    return this.settings[parent][child] ? this.settings[parent][child] : defaultValue;
                }
            } else {
                if (this.settings[this.environment][parent] && this.settings[this.environment][parent][child]) {
                    returnVal = this.settings[this.environment][parent][child];
                } else if (this.cascadeMode && this.settings[parent] && this.settings[parent][child]) {
                    returnVal = this.settings[parent][child];
                }

                return returnVal;
            }
        }
    }

    
    /**
     * Environment Enabled
     * A handy method for determining if we are using the default
     * environment or have another specified like; staging
     *
     * @returns {boolean}
     */
    environmentEnabled() {
        return (this.environment === 'default' || this.environment === '' || !this.environment) ? false : true;
    }
}