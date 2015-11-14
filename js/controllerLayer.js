/**
 * Created by airing on 15/10/19.
 */
function startGame(cxt)
{
    init(cxt);     //初始化游戏界面UI
    score = 0;
    addscore = 0;
    updateScore();
    newBox(cxt);
    newBox(cxt);
    newBox(cxt);
    newBox(cxt);
    newBox(cxt);
    newBox(cxt);
    newBox(cxt);
    newBox(cxt);
}

function gameSave()
{
    for(var i=0;i<8;i++)
    for(var j=0;j<8;j++)
    {
        d[i][j]=c[i][j];
        c[i][j]=b[i][j];
        b[i][j]=a[i][j];
        a[i][j]=nums[i][j];
    }
}

function gameBack(cxt)
{
    for(var i=0;i<8;i++)
        for(var j=0;j<8;j++)
        {
            nums[i][j]=b[i][j];
            a[i][j]=b[i][j];
            b[i][j]=c[i][j];
            c[i][j]=d[i][j];
        }
    addscore=-addscore;
    updateScore(addscore);
    updateBoardView(cxt);

}

function newBox(cxt) {
    if (noSpace()) return false;
    //随机生成一个位置


   for(var times=0;times<250;times++)
    {
        randx = parseInt(Math.floor(Math.random() * 8));
        randy = parseInt(Math.floor(Math.random() * 8));

        if (nums[randx][randy] == 0) break;
    }

    if (times == 250) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (nums[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;

    nums[randx][randy] = randNumber;
    drawBox(cxt, randx, randy, randNumber);
    return true;
}

function moveKeyDown() {
    if(isGameOver()) return 0;
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) { //为空或者相等
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
            break;
        case 38://up
            if (moveUp()) {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
            break;
        case 39://right
            if (moveRight()) {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
            break;
        case 40://down
            if (moveDown()) {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
            break;
        default :
            break;
    }

}

document.addEventListener('touchstart',function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var daltaX = endX - startX;
    var daltaY = endY - startY;

    if(Math.abs(daltaX) < 0.1 * documentWidth && Math.abs(daltaY) < 0.1 * documentWidth)
        return 0;

    //任务1：实现移动端触摸逻辑
    if(Math.abs(daltaX)<=Math.abs(daltaY))
    {
        if(daltaY<0)
            if(moveUp())
            {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
        if(daltaY>0)
            if(moveDown())
            {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
    }
    if(Math.abs(daltaX)>Math.abs(daltaY))
    {
        if(daltaX<0)
            if(moveLeft())
            {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
        if(daltaX>0)
            if(moveRight())
            {
                newBox(context);
                newBox(context);
                newBox(context);
                newBox(context);
                isGameOver();
            }
    }

});

function moveLeft() {
    if (!canMoveLeft()) return false;
    for (var j = 0; j < 8; j++)
        for (var i = 1; i < 8; i++)
            if (nums[i][j] != 0)
                for (var k = 0; k < i; k++)
                {
                    if (nums[k][j] == 0)
                    {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, k, i, nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        adds+=nums[k][j];
                    }
                }
    addscore = adds;
    adds = 0;
    updateScore();
    updateBoardView(context);
    return true;
}

function canMoveLeft() {
    for (var j = 0; j < 8; j++)
        for (var i = 1; i < 8; i++)
            if (nums[i][j] != 0)
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j])
                { gameSave(); return true; }
    return false;
}

function moveUp() {
    //任务2：实现“上”逻辑
    if(!canMoveUp()) return false;
    for(var i=0;i<8;i++)
        for(var j=1;j<8;j++)
            if(nums[i][j]!=0)
                 for(var k=0;k<j;k++)
                    {
                    if(nums[i][k]==0)
                     {
                         nums[i][k]=nums[i][j];
                         nums[i][j]=0;
                     }
                    else if(nums[i][k]==nums[i][j]&&noBlockVertical(i,k,j,nums))
                    {
                        nums[i][k]+=nums[i][k];
                        nums[i][j]=0;
                        adds+=nums[i][k];
                    }
                    }
    addscore = adds;
    adds = 0;
    updateScore();
    updateBoardView(context);
    return true;
}

function canMoveUp() {
    //任务3：实现判断是否可以向上的逻辑
    for(var i=0;i<8;i++)
        for(var j=1;j<8;j++)
            if(nums[i][j]!=0)
                if(nums[i][j-1]==0||nums[i][j-1]==nums[i][j])
                { gameSave(); return true; }
    return false;
}

function moveRight() {
    //任务4：实现“右”逻辑
    if(!canMoveRight()) return false;
    for(var j=0;j<8;j++)
        for(var i=6;i>=0;i--)
            if(nums[i][j]!=0)
            for(var k=7;k>i;k--)
                if(nums[k][j]==0)
                {
                    nums[k][j]=nums[i][j];
                    nums[i][j]=0;
                }
                else if(nums[k][j]==nums[i][j]&&noBlockHorizontal(j,i,k,nums))
                {
                    nums[k][j]+=nums[k][j];
                    nums[i][j]=0;
                    adds+=nums[k][j];
                }
    addscore = adds;
    adds = 0;
    updateScore();
    updateBoardView(context);
    return true;
}

function canMoveRight() {
    //任务5：实现判断是否可以向右的逻辑
    for(var j=0;j<8;j++)
        for(var i=6;i>=0;i--)
         if(nums[i][j]!=0)
             if(nums[i+1][j]==0||nums[i+1][j]==nums[i][j])
             { gameSave(); return true; }
    return false;
}

function moveDown() {
    //任务6：实现“下”逻辑
    if(!canMoveDown()) return false;
    for(var i=0;i<8;i++)
        for(var j=6;j>=0;j--)
         if(nums[i][j]!=0)
             for(var k=7;k>j;k--)
                 if(nums[i][k]==0)
                 {
                     nums[i][k]=nums[i][j];
                     nums[i][j]=0;
                 }
                 else if(nums[i][k]==nums[i][j] && noBlockVertical(i,j,k,nums))
                 {
                     nums[i][k]+=nums[i][k];
                     nums[i][j]=0;
                     adds+=nums[k][j];
                 }
    addscore = adds;
    adds = 0;
    updateScore();
    updateBoardView(context);
    return true;
}

function canMoveDown() {
    //任务7：实现判断是否可以向下的逻辑
    for(var i=0;i<8;i++)
        for(var j=6;j>=0;j--)
            if(nums[i][j]!=0)
                if(nums[i][j+1]==0||nums[i][j+1]==nums[i][j])
                { gameSave(); return true; }
    return false;
}

function noBlockVertical(col, row1, row2, nums) {
    //任务8：实现判断垂直方向上是否有障碍物
    for(row1++;row1<row2;row1++)
     if(nums[col][row1]!=0)
        return false;
    return true;
}

function noBlockHorizontal(row, col1, col2, nums) {
    for (var i = col1 + 1; i < col2; i++) {
        if (nums[i][row] != 0) {
            return false;
        }
    }
    return true;
}

function updateScore(){
    score += addscore;
    document.getElementById("score").innerText = score;
}

function noSpace() {
    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
            if (nums[i][j] == 0)
                return false;

    return true;
}

function noMove() {

    if(canMoveLeft() ||
        canMoveRight() ||
        canMoveUp() ||
        canMoveDown())
        return false;

    return true;
}

function isGameOver(){
    if(noMove() && noSpace()){
        alert("GameOver.Score:" + score);
        alert("如果你觉得这个游戏还可以,请给作者点个赞吧!");
        return true;
    }
    return false;
}