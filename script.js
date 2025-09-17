 
    const STORAGE_KEY = 'notasGerenciador';

    
    function carregarNotas() {
      const notasJSON = localStorage.getItem(STORAGE_KEY);
      if (!notasJSON) return [];
      try {
        return JSON.parse(notasJSON);
      } catch {
        return [];
      }
    }

    
    function salvarNotas(notas) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
    }

    
    function atualizarLista() {
      const notas = carregarNotas();
      const ul = document.getElementById('notesList');
      ul.innerHTML = '';

      if (notas.length === 0) {
        ul.innerHTML = '<li><em>Nenhuma nota cadastrada.</em></li>';
        return;
      }

      notas.forEach((nota) => {
        const li = document.createElement('li');
        li.textContent = nota.titulo;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.className = 'remove-btn';
        btnRemover.addEventListener('click', () => {
          removerNota(nota.titulo);
        });

        li.appendChild(btnRemover);
        ul.appendChild(li);
      });
    }

   
    function adicionarNota() {
      const input = document.getElementById('noteTitle');
      const titulo = input.value.trim();

      if (titulo === '') {
        alert('Por favor, digite um título para a nota.');
        return;
      }

      let notas = carregarNotas();

      
      const existe = notas.some(nota => nota.titulo.toLowerCase() === titulo.toLowerCase());
      if (existe) {
        alert('Já existe uma nota com este título. Por favor, escolha outro título.');
        return;
      }

      
      notas.push({ titulo });
      salvarNotas(notas);
      atualizarLista();

      input.value = '';
      input.focus();
    }

  
    function removerNota(titulo) {
      let notas = carregarNotas();
      notas = notas.filter(nota => nota.titulo !== titulo);
      salvarNotas(notas);
      atualizarLista();
    }

    document.getElementById('addNoteBtn').addEventListener('click', adicionarNota);

    
    document.getElementById('noteTitle').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        adicionarNota();
      }
    });

    
    atualizarLista();
  