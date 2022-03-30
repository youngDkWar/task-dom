/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let el = document.createElement(tag);
        el.textContent = content;
        document.body.append(el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let allElems = 0,
        result = [];
    for (let i = 0; i < level; i++) {
        let previous = allElems,
            k = 0;
        allElems += childrenCount ** i;
        for (let j = previous; j < allElems; j++) {
            result[j] = document.createElement('div');
            result[j].classList.add('item_' + (i + 1));

            if (i == 0) {
                continue;
            }
            if (k < childrenCount) {
                k++;
            } else {
                k = 1;
                --previous;
            }
            result[previous - 1].append(result[j]);
        }
    }
    return result[0];
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    [...tree.querySelectorAll('.item_2')].forEach((el) => {
        const new_tag = document.createElement('section');
        new_tag.classList.add(el.className);
        new_tag.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(new_tag, el);
    });
    return tree;
}
