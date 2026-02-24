let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allcards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');

const emptyState = document.getElementById('emptyState');
const tabCount = document.getElementById('tab-count');
function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id) {
  allFilterBtn.classList.add('bg-gray-200', 'text-black', 'border');
  interviewFilterBtn.classList.add('bg-gray-200', 'text-black', 'border');
  rejectedFilterBtn.classList.add('bg-gray-200', 'text-black', 'border');

  allFilterBtn.classList.remove('bg-blue-500', 'text-white');
  interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
  rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

  const selected = document.getElementById(id);

  currentStatus = id;
  console.log(currentStatus);

  selected.classList.remove('bg-gray-200', 'text-black', 'border');
  selected.classList.add('bg-blue-500', 'text-white');
  if (id == 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    if (interviewList.length === 0) {
      emptyState.classList.remove('hidden');
      emptyState.classList.add('flex');
      filterSection.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      emptyState.classList.remove('flex');
      filterSection.classList.remove('hidden');
      renderInterview();
    }
  } else if (id == 'all-filter-btn') {
    filterSection.classList.add('hidden');
    if (allCardSection.children.length === 0) {
      emptyState.classList.remove('hidden');
      emptyState.classList.add('flex');
      allCardSection.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      emptyState.classList.remove('flex');
      allCardSection.classList.remove('hidden');
    }
  } else if (id == 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
    if (rejectedList.length === 0) {
      emptyState.classList.remove('hidden');
      emptyState.classList.add('flex');
      filterSection.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      emptyState.classList.remove('flex');
      filterSection.classList.remove('hidden');
      renderRejected();
    }
  }
}
mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('interview-btn')) {
    const parenNode = event.target.parentNode.parentNode.parentNode;

    const company = parenNode.querySelector('.company').innerText;
    const position = parenNode.querySelector('.position').innerText;
    const location = parenNode.querySelector('.location').innerText;
    const type = parenNode.querySelector('.type').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const status = parenNode.querySelector('.status').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.status').innerText = 'INTERVIEW';
    parenNode.querySelector('.status').className =
      'status inline-block bg-teal-50 border border-teal-200 text-teal-600 px-3 py-1 rounded text-xs font-bold';

    const cardInfo = {
      company,
      position,
      location,
      type,
      salary,
      status: 'INTERVIEW',
      notes,
    };

    const jobExist = interviewList.find(
      item => item.company == cardInfo.company,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(
      item => item.company != cardInfo.company,
    );

    if (currentStatus == 'rejected-filter-btn') {
      toggleStyle(currentStatus);
    }

    calculateCount();
  } else if (event.target.classList.contains('rejected-btn')) {
    const parenNode = event.target.parentNode.parentNode.parentNode;

    const company = parenNode.querySelector('.company').innerText;
    const position = parenNode.querySelector('.position').innerText;
    const location = parenNode.querySelector('.location').innerText;
    const type = parenNode.querySelector('.type').innerText;
    const salary = parenNode.querySelector('.salary').innerText;
    const status = parenNode.querySelector('.status').innerText;
    const notes = parenNode.querySelector('.notes').innerText;

    parenNode.querySelector('.status').innerText = 'REJECTED';
    parenNode.querySelector('.status').className =
      'status inline-block bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded text-xs font-bold';

    const cardInfo = {
      company,
      position,
      location,
      type,
      salary,
      status: 'REJECTED',
      notes,
    };

    const jobExist = rejectedList.find(
      item => item.company == cardInfo.company,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      item => item.company != cardInfo.company,
    );
    if (currentStatus == 'interview-filter-btn') {
      toggleStyle(currentStatus);
    }

    calculateCount();
  } else if (
    event.target.classList.contains('btn-delete') ||
    event.target.closest('.btn-delete')
  ) {
    const btnNode = event.target.closest('.btn-delete');
    const parenNode = btnNode.parentNode.parentNode;
    const company = parenNode.querySelector('.company').innerText;

    interviewList = interviewList.filter(item => item.company != company);
    rejectedList = rejectedList.filter(item => item.company != company);

    parenNode.remove();
    if (currentStatus !== 'all') {
      toggleStyle(currentStatus);
    } else {
      toggleStyle('all-filter-btn');
    }
  }
});
function renderInterview() {
  filterSection.innerHTML = '';

  for (let job of interviewList) {
    let div = document.createElement('div');
    div.className =
      'card flex justify-between border border-gray-200 p-8 rounded-xl mt-4 shadow-sm relative bg-white';
    div.innerHTML = `
         <div class="flex flex-col gap-3">
            <div>
              <p class="company text-xl font-bold text-gray-800">${job.company}</p>
              <p class="position text-gray-500 text-sm">${job.position}</p>
            </div>

            <div class="flex gap-2 text-xs text-gray-500 my-1">
              <p class="location">${job.location}</p> • 
              <p class="type">${job.type}</p> • 
              <p class="salary">${job.salary}</p>
            </div>
            
            <div>
              <p class="status inline-block bg-teal-50 border border-teal-200 text-teal-600 px-3 py-1 rounded text-xs font-bold">${job.status}</p>
            </div>
            <p class="notes text-sm text-gray-600 mt-2">${job.notes}</p>

            <div class="flex gap-2 mt-2">
              <button class="interview-btn border border-teal-200 text-teal-600 px-4 py-2 rounded font-medium hover:bg-teal-50">INTERVIEW</button>
              <button class="rejected-btn border border-red-200 text-red-600 px-4 py-2 rounded font-medium hover:bg-red-50">REJECTED</button>
            </div>
          </div>

          <div>
            <button class="btn-delete absolute top-8 right-8 hover:opacity-75 transition-opacity">
              <img src="delete.png" alt="Delete" class="w-6 h-6 opacity-60 hover:opacity-100">
            </button>
          </div>
        `;
    filterSection.appendChild(div);
  }
}

function renderRejected() {
  filterSection.innerHTML = '';

  for (let job of rejectedList) {
    let div = document.createElement('div');
    div.className =
      'card flex justify-between border border-gray-200 p-8 rounded-xl mt-4 shadow-sm relative bg-white';
    div.innerHTML = `
         <div class="flex flex-col gap-3">
            <div>
              <p class="company text-xl font-bold text-gray-800">${job.company}</p>
              <p class="position text-gray-500 text-sm">${job.position}</p>
            </div>

            <div class="flex gap-2 text-xs text-gray-500 my-1">
              <p class="location">${job.location}</p> • 
              <p class="type">${job.type}</p> • 
              <p class="salary">${job.salary}</p>
            </div>
            
            <div>
              <p class="status inline-block bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded text-xs font-bold">${job.status}</p>
            </div>
            <p class="notes text-sm text-gray-600 mt-2">${job.notes}</p>

            <div class="flex gap-2 mt-2">
              <button class="interview-btn border border-teal-200 text-teal-600 px-4 py-2 rounded font-medium hover:bg-teal-50">INTERVIEW</button>
              <button class="rejected-btn border border-red-200 text-red-600 px-4 py-2 rounded font-medium hover:bg-red-50">REJECTED</button>
            </div>
          </div>

          <div>
            <button class="btn-delete absolute top-8 right-8 hover:opacity-75 transition-opacity">
              <img src="delete.png" alt="Delete" class="w-6 h-6 opacity-60 hover:opacity-100">
            </button>
          </div>
        `;
    filterSection.appendChild(div);
  }
}
