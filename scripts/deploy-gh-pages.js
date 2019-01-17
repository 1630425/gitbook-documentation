require("shelljs/global");

run();

function run() {
    if (!which("git")) {
        echo("Sorry, this script requires git");
        exit(1);
    } else {
        echo("======================Auto Deploy Github Pages Begin======================");
        var gh_pages = "~/gitbooks/gh-pages/gitbook-documentation/";
        var git_book = "~/gitbooks/gitbook/gitbook-documentation/";
        var command = 'rm -rf ' + gh_pages + '* && cp -R ' + git_book +'_book/* ' + gh_pages;
        echo("command:"+command);
        exec(command);
        
        cd(gh_pages);
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