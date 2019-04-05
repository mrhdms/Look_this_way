$(document).ready(function () {
    var user_a_hp = $("#A .hp");
    var user_a_atk_l = $("#A .atk_l");
    var user_a_atk_s = $("#A .atk_s");
    var user_a_heal = $("#A .heal");
    var user_b_hp = $("#B .hp");
    var user_b_atk_l = $("#B .atk_l");
    var user_b_atk_s = $("#B .atk_s");
    var user_b_heal = $("#B .heal");
    var log = $("#LogArea");

    var user_a_max_hp = user_a_hp.val();
    var user_b_max_hp = user_b_hp.val();

    user_a_hp.on("change", function(){
        user_a_max_hp = user_a_hp.val();
        console.log(user_a_max_hp);
    });

    user_b_hp.on("change", function () {
        user_b_max_hp = user_b_hp.val();
    });

    //じゃんけん
    $("#phase_a .win_a").on("click", function () {
        //Aの勝ち
        user_b_hp.val(calcPhaseADamage(user_b_hp, user_a_atk_s));
        AddLog("Aがじゃんけんに勝ち" + user_a_atk_s.val() + "のダメージを与えた");
    });

    $("#phase_a .win_b").on("click", function () {
        //Bの勝ち
        user_a_hp.val(calcPhaseADamage(user_a_hp, user_b_atk_s));
        AddLog("Bがじゃんけんに勝ち" + user_b_atk_s.val() + "のダメージを与えた");
    });

    $("#phase_a .draw").on("click", function () {
        //あいこ
        user_a_hp.val(calcHealAmount(user_a_hp, user_a_heal, user_a_max_hp));
        user_b_hp.val(calcHealAmount(user_b_hp, user_b_heal, user_b_max_hp));
        AddLog("あいこでAが" + user_a_heal.val() + "回復、Bが" + user_b_heal.val() + "回復");
    });

    //あっち向いてホイ
    $("#phase_b .win_a").on("click", function () {
        //Aの勝ち
        user_b_hp.val(calcPhaseBDamage(user_b_hp, user_a_atk_l));
        AddLog("Aがあっち向いてホイに勝ち" + user_a_atk_l.val() + "のダメージを与えた");
        checkResult();
    });

    $("#phase_b .win_b").on("click", function () {
        //Bの勝ち
        user_a_hp.val(calcPhaseBDamage(user_a_hp, user_b_atk_l));
        AddLog("Bがあっち向いてホイに勝ち" + user_b_atk_l.val() + "のダメージを与えた");
        checkResult();
    });

    $("#reset").on("click", function () {
        //リセット
        location.reload();
    });

    function calcPhaseADamage(hp, atk_s) {
        var result = hp.val() - atk_s.val();
        if (result < 1)
            result = 1;

        return result;
    }

    function calcPhaseBDamage(hp, atk_l) {
        var result = hp.val() - atk_l.val();
        if (result < 0)
            result = 0;

        return result;
    }

    function calcHealAmount(hp, heal, max_hp)
    {
        var result = Number(hp.val()) + Number(heal.val())
        if (result > max_hp)
            result = max_hp;

        return result;
    }

    function checkResult() {
        if (user_a_hp.val() <= 0)
            winB();

        if (user_b_hp.val() <= 0)
            winA();
    }

    function winA()
    {
        AddLog("★Aが勝ちました");
    }

    function winB() {
        AddLog("★Bが勝ちました");
    }

    function AddLog(str)
    {
        log.val(str + "\n" + log.val());
    }
});