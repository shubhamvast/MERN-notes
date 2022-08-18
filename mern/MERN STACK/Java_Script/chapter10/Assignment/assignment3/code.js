function fun(echo) {
    console.log(echo);
    };

    fun("hello"); //hello

    function boo(aFunction) {
    aFunction("boo");
    }

    boo(fun);//boo

    console.log(fun);//function

    fun(boo);//function

    var moreFun = fun;

    moreFun("hello again");//hello again

    function echoMaker() {
    return fun;
    }
    var bigFun = echoMaker();
    
    bigFun("Is there an echo?");//is there an echo