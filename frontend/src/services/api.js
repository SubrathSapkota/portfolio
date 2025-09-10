// API service for todo operations with Cloudflare Worker

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://todoapp.subrathsapkota119.workers.dev';

class TodoAPI {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle empty responses (like DELETE)
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all todos
  async getTodos() {
    return this.request('/api/todos');
  }

  // Create a new todo
  async createTodo(todo) {
    return this.request('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  // Update a todo
  async updateTodo(id, updates) {
    return this.request(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete a todo
  async deleteTodo(id) {
    return this.request(`/api/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Toggle todo completion
  async toggleTodo(id, completed) {
    return this.updateTodo(id, { completed });
  }
}

// Export a singleton instance
export const todoAPI = new TodoAPI();
export default todoAPI;
