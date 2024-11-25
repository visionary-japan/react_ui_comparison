(module
 (type $0 (func (param i32 i32) (result i32)))
 (type $1 (func (param i32) (result i32)))
 (global $~lib/memory/__data_end i32 (i32.const 8))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 32776))
 (global $~lib/memory/__heap_base i32 (i32.const 32776))
 (memory $0 0)
 (table $0 1 1 funcref)
 (elem $0 (i32.const 1))
 (export "add" (func $assembly/index/add))
 (export "fibonacci" (func $assembly/index/fibonacci))
 (export "memory" (memory $0))
 (func $assembly/index/add (param $a i32) (param $b i32) (result i32)
  local.get $a
  local.get $b
  i32.add
  return
 )
 (func $assembly/index/fibonacci (param $n i32) (result i32)
  local.get $n
  i32.const 1
  i32.le_s
  if
   local.get $n
   return
  end
  local.get $n
  i32.const 1
  i32.sub
  call $assembly/index/fibonacci
  local.get $n
  i32.const 2
  i32.sub
  call $assembly/index/fibonacci
  i32.add
  return
 )
)
