'use strict'

module.exports = {
    alertPolicy: require('./lib/alertPolicy.js'),
    application: require('./lib/application.js'),
    category: require('./lib/category.js'),
    chart: require('./lib/chart.js'),
    cluster: require('./lib/cluster.js'),
    container: require('./lib/container.js'),
    dashboard: require('./lib/dashboard.js'),
    event: require('./lib/event.js'),
    fileGroup: require('./lib/fileGroup.js'),
    filter: require('./lib/filter.js'),
    focus: require('./lib/focus.js'),
    host: require('./lib/host.js'),
    idempotence: require('./lib/idempotence.js'),
    image: require('./lib/image.js'),
    managementServers: require('./lib/cluster.js').management_servers,
    marketplace: require('./lib/marketplace.js'),
    networks: require('./lib/networks.js'),
    pc: this.ssp,
    prismCentral: require('./lib/prismCentral.js'),
    project: require('./lib/project.js'),
    protectionDomain: require('./lib/protectionDomain.js'),
    remoteSite: require('./lib/remoteSite.js'),
    role: require('./lib/role.js'),
    report: require('./lib/report.js'),
    scenario: require('./lib/scenario.js'),
    securityPolicy: require('./lib/securityPolicy.js'),
    securityRule: require('./lib/securityRule.js'),
    snapshots: require('./lib/snapshots.js'),
    ssp: {
        application: require('./lib/application.js'),
        category: require('./lib/category.js'),
        dashboard: require('./lib/dashboard.js'),
        filter: require('./lib/filter.js'),
        focus: require('./lib/focus.js'),
        image: require('./lib/image.js').ssp,
        marketplace: require('./lib/marketplace.js'),
        project: require('./lib/project.js'),
        report: require('./lib/report.js'),
        role: require('./lib/role.js'),
        scenario: require('./lib/scenario.js'),
        securityPolicy: require('./lib/securityPolicy.js'),
        securityRule: require('./lib/securityRule.js'),
        snapshots: require('./lib/snapshots.js'),
        tag: require('./lib/tag.js'),
        task: require('./lib/task.js'),
        util: require('./lib/cluster.js').util,
        vm: require('./lib/vm.js')
    },
    storagePool: require('./lib/storagePool.js'),
    tag: require('./lib/tag.js'),
    task: require('./lib/task.js'),
    util: require('./lib/cluster.js').util,
    vm: require('./lib/vm.js'),
    volumeGroup: require('./lib/volumeGroup.js')
}