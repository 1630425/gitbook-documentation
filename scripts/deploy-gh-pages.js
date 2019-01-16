'use strict';

require("shelljs/global");

echo("======================");

run();

function run() {
    if (!which("git")) {
        echo("Sorry, this script requires git");
        exit(1);
    } else {
        echo("======================Auto Deploy Github Pages Begin======================");
        exec("rm -rf ~/gitbookd/* && cp -R ~/gitbook-documentation/_book/* ~/gitbookd");
        
        cd("~/gitbookd");
        //此处修改为Hexo根目录路径
        if (exec("git add --all").code !== 0) {
            echo("Error: Git add failed");
            exit(1);
        }
        if (exec('git commit -am "Form auto backup script\'s commit"').code !== 0) {
            echo("Error: Git commit failed");
            exit(1);
        }
        if (exec("git push origin").code !== 0) {
            echo("Error: Git push failed");
            exit(1);
        }
        echo("======================Auto Deploy Github Pages Complete======================");
    }
}