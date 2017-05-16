project = ["TUV", "春酒", "職涯", "招生", "海參", "結業"];

var m = document.querySelectorAll('.m');
m.forEach(mm => mm.addEventListener('mouseover', appear));
m.forEach(mm => mm.addEventListener('mouseleave', disappear));

function appear() {
    var content = this.children[0];
    // var i = content.dataset.key;
    // content.innerHTML = project[i - 1];

    this.children[1].classList.remove('op');
    this.children[1].classList.add('none-op');
    this.children[0].classList.remove('none-op');
    this.children[0].classList.add('op');
    this.children[2].children[0].classList.add('circle-appear');
    this.children[2].children[1].classList.add('circle2-appear');
}

function disappear() {
    var content = this.children[0];
    // var i = content.dataset.key;
    // content.innerHTML = i;
    this.children[0].classList.add('none-op');
    this.children[0].classList.remove('op');
    this.children[1].classList.remove('none-op');
    this.children[1].classList.add('op');
    this.children[2].children[0].classList.remove('circle-appear');
    this.children[2].children[1].classList.remove('circle2-appear');
}
