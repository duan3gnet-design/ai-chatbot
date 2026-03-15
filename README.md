cd backend && uvicorn main:app --reload
cd backend && pip freeze > requirements.txt

npm create vite@latest frontend -- --template react
cd frontend && npm install
npm run dev

pip install google-generativeai