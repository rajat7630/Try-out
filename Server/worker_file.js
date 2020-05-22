const { Worker, isMainThread } = require("worker_threads");
function timeout(ms) {
    return new Promise(res => setTimeout(res, parseInt(ms)));
}
module.exports = async (program, timelimit, callback) => {
    console.log(program);
    const programWorker = new Worker(program, { eval: true });
    let status = false;
    programWorker.on("error", () => {
        console.log("process error found");
        status = true;
        callback(true);
        programWorker.terminate();
    });
    if (status === false) {

        programWorker.on("exit", () => {
            console.log("process finished");
            status = true;
            callback(true);
        });
    }
    await timeout(timelimit);
    if (status === false) {
        callback(false);
    }
    programWorker.terminate();
}