// Cloudflare Worker for Todo API with KV Storage

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route handling
      if (url.pathname === '/api/todos' && request.method === 'GET') {
        return handleGetTodos(env, corsHeaders);
      }
      
      if (url.pathname === '/api/todos' && request.method === 'POST') {
        return handleCreateTodo(request, env, corsHeaders);
      }
      
      if (url.pathname.startsWith('/api/todos/') && request.method === 'PUT') {
        const id = url.pathname.split('/').pop();
        return handleUpdateTodo(request, env, corsHeaders, id);
      }
      
      if (url.pathname.startsWith('/api/todos/') && request.method === 'DELETE') {
        const id = url.pathname.split('/').pop();
        return handleDeleteTodo(env, corsHeaders, id);
      }

      // Default response for unmatched routes
      return new Response('Not Found', { 
        status: 404, 
        headers: corsHeaders 
      });
      
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  },
};

// Get all todos
async function handleGetTodos(env, corsHeaders) {
  try {
    const todosData = await env.TODOS.get('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    
    return new Response(JSON.stringify(todos), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error getting todos:', error);
    return new Response('Error fetching todos', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}

// Create a new todo
async function handleCreateTodo(request, env, corsHeaders) {
  try {
    const { title, description } = await request.json();
    
    if (!title) {
      return new Response('Title is required', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Get existing todos
    const todosData = await env.TODOS.get('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    
    // Create new todo
    const newTodo = {
      id: Date.now().toString(),
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to todos array
    todos.push(newTodo);
    
    // Save back to KV
    await env.TODOS.put('todos', JSON.stringify(todos));
    
    return new Response(JSON.stringify(newTodo), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    return new Response('Error creating todo', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}

// Update a todo
async function handleUpdateTodo(request, env, corsHeaders, id) {
  try {
    const updates = await request.json();
    
    // Get existing todos
    const todosData = await env.TODOS.get('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    
    // Find and update the todo
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return new Response('Todo not found', { 
        status: 404, 
        headers: corsHeaders 
      });
    }
    
    // Update the todo
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Save back to KV
    await env.TODOS.put('todos', JSON.stringify(todos));
    
    return new Response(JSON.stringify(todos[todoIndex]), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    return new Response('Error updating todo', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}

// Delete a todo
async function handleDeleteTodo(env, corsHeaders, id) {
  try {
    // Get existing todos
    const todosData = await env.TODOS.get('todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    
    // Filter out the todo to delete
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return new Response('Todo not found', { 
        status: 404, 
        headers: corsHeaders 
      });
    }
    
    // Save back to KV
    await env.TODOS.put('todos', JSON.stringify(filteredTodos));
    
    return new Response('Todo deleted', {
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return new Response('Error deleting todo', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}
