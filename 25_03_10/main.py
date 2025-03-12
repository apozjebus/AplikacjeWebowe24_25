def read_graph(filename):
    file = open(filename, 'r')
    lines = file.readlines()
    graph = {'size': lines[0].split()[0]}
    for line in lines[1:]:
        graph[line.split()[0]] = line.split()[1:]
    return graph

def write_neighbours_list(graph):
    for key, value in graph.items():
        if key != 'size':
            string = ', '.join(value)
            print("Sąsiadami wierzchołka " + key + " są: " + string)

def list_to_matrix(graph):
    array = [['x'] * (int(graph['size']) + 1) for _ in range((int(graph['size']) + 1))]
    count = 1
    for key, value in graph.items():
        if key != 'size':
            array[0][count] = key
            count += 1
    count = 1
    for key, value in graph.items():
        if key != 'size':
            array[count][0] = key
            for i in range(1, len(array[count])):
                if array[0][i] in value:
                    array[count][i] = '1'
                else:
                    array[count][i] = '0'
            count += 1
    return array

def write_matrix(matrix):
    for arr in matrix:
        for num in arr:
            print(num, end=' ')
        print()


def main():
    graph = read_graph('graph.txt')
    print(graph)
    write_neighbours_list(graph)
    matrix = list_to_matrix(graph)
    write_matrix(matrix)

if __name__ == '__main__':
    main()